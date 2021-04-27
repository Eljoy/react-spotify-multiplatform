import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import axiosRetry, { IAxiosRetryConfig } from "axios-retry";
import { AppDependencies } from "../dependencies";
import { Auth } from "../features";
import { inject, injectable } from "inversify";

const retryableHTTPStatusCodes = [
  401, // [Auth Error]
  403, // [Auth Error]
  408, // [Request Timeout]
  500, // [Internal Server Error]
  502, // [Bad Gateway]
  503, // [Service Unavailable]
  504 //  [Gateway Timeout]
];

const DEFAULT_RETRY_CONFIG: IAxiosRetryConfig = {
  retries: 3,
  retryDelay: exponentialDelay,
  retryCondition: (error) => {
    return retryableHTTPStatusCodes.includes(error.response?.status) || error.message === "Network Error";
  }
};

function exponentialDelay(retryNumber = 0) {
  const seconds = Math.pow(2, retryNumber) * 200;
  const randomMs = 1000 * Math.random();
  return seconds + randomMs;
}

export type ApiClient = AxiosInstance

@injectable()
export default class ApiClientBuilder {
  private requestInterceptors = [];
  private retryConfig = null;

  @inject(AppDependencies.SPOTIFY_AUTH_REPOSITORY)
  private authRepository: Auth.SpotifyAuthRepository;

  withRetryRequest(retryConfig: IAxiosRetryConfig = {}) {
    this.retryConfig = retryConfig;
    return this;
  }

  withAuthHeader() {
    if (!this.requestInterceptors.includes(this.authRequestInterceptor)) {
      this.requestInterceptors.push(this.authRequestInterceptor.bind(this));
    }
    return this;
  }

  build(config: AxiosRequestConfig = {}) {
    const client = axios.create(config);
    this.requestInterceptors.forEach(interceptor => {
      client.interceptors.request.use(interceptor, null);
    });
    if (this.retryConfig) {
      axiosRetry(client, {
        ...DEFAULT_RETRY_CONFIG,
        ...this.retryConfig
      });
    }
    return client;
  }

  private async authRequestInterceptor(config: AxiosRequestConfig) {
    const token = await this.authRepository.getAuthToken();
    config.headers.authorization = `Bearer ${token.accessToken}`;
    return config;
  }
}
