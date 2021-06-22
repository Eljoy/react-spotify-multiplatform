import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { IAxiosCacheAdapterOptions, setupCache } from 'axios-cache-adapter'
import axiosRetry, { IAxiosRetryConfig } from 'axios-retry'
import { provide } from 'inversify-binding-decorators'
import { AppDependencies } from '../dependencies'
import { Auth } from '../features'
import { spotifyAppDecorators } from '../inversify.config'
import ApiCacheStore from './ApiCacheStore'

const retryableHTTPStatusCodes = [
  401, // [Auth Error]
  403, // [Auth Error]
  408, // [Request Timeout]
  500, // [Internal Server Error]
  502, // [Bad Gateway]
  503, // [Service Unavailable]
  504, // [Gateway Timeout]
]

const DEFAULT_RETRY_CONFIG: IAxiosRetryConfig = {
  retries: 3,
  retryDelay: exponentialDelay,
  retryCondition: (error) => {
    return (
      retryableHTTPStatusCodes.includes(error.response?.status) ||
      error.message === 'Network Error'
    )
  },
}

const DEFAULT_CACHE_CONFIG: IAxiosCacheAdapterOptions = {
  maxAge: 15 * 60 * 1000,
  readHeaders: true,
  readOnError: true,
}

export declare namespace ApiClientBuilder {
  type ApiClient = AxiosInstance
}

@provide(AppDependencies.Common.ApiClientBuilder)
export class ApiClientBuilder {
  private requestInterceptors = []
  private retryConfig = null
  private adapter = null

  @spotifyAppDecorators.lazyInject(AppDependencies.Auth.Repository)
  private authRepository: Auth.SpotifyAuthRepository

  withRetryRequest(retryConfig: IAxiosRetryConfig = {}) {
    this.retryConfig = retryConfig
    return this
  }

  withAuthBearerHeader() {
    if (!this.requestInterceptors.includes(this.authBearerRequestInterceptor)) {
      this.requestInterceptors.push(
        this.authBearerRequestInterceptor.bind(this)
      )
    }
    return this
  }

  withBasicAuthHeader() {
    if (
      !this.requestInterceptors.includes(
        ApiClientBuilder.basicAuthRequestInterceptor
      )
    ) {
      this.requestInterceptors.push(
        ApiClientBuilder.basicAuthRequestInterceptor.bind(this)
      )
    }
    return this
  }

  withCacheResponse(cacheConfig: IAxiosCacheAdapterOptions = {}) {
    const cache = setupCache({
      store: new ApiCacheStore(),
      ...DEFAULT_CACHE_CONFIG,
      ...cacheConfig,
    })
    this.adapter = cache.adapter
    return this
  }

  build(config: AxiosRequestConfig = {}) {
    const client = axios.create({
      adapter: this.adapter,
      ...config,
    })
    this.requestInterceptors.forEach((interceptor) => {
      client.interceptors.request.use(interceptor, null)
    })
    if (this.retryConfig) {
      axiosRetry(client, {
        ...DEFAULT_RETRY_CONFIG,
        ...this.retryConfig,
      })
    }
    return client
  }

  private async authBearerRequestInterceptor(config: AxiosRequestConfig) {
    const token = await this.authRepository.getAuthToken()
    config.headers.authorization = `Bearer ${token.accessToken}`
    return config
  }

  private static basicAuthRequestInterceptor(config: AxiosRequestConfig) {
    config.headers.authorization =
      'Basic MDYwMDYzOTRmMDNlNDFiOWFmNTU3ZTVlMDBhYjIyMjA6OTJhMjg0Y2M2ZjU2NGUzNGE4YjEyNTQ3M2M1YTk4OTc='
    return config
  }
}

function exponentialDelay(retryNumber = 0) {
  const seconds = Math.pow(2, retryNumber) * 200
  const randomMs = 1000 * Math.random()
  return seconds + randomMs
}
