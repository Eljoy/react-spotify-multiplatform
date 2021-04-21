import { ApiClientBuilder, ApiClient } from "../../../../api";
import { inject, injectable } from "inversify";
import { AppDependencies } from "../../../../dependencies";
import { User } from "../../entities";

@injectable()
export default class UserProfileApi {
  private apiClient: ApiClient

  constructor(@inject(AppDependencies.API_CLIENT_BUILDER) apiClientBuilder: ApiClientBuilder) {
    this.apiClient = apiClientBuilder
      .withRetryRequest()
      .withAuthHeader()
      .build()
  }

  async fetchCurrentUser(): Promise<User> {
    const { data: userDAO } = await this.apiClient.get('https://api.spotify.com/v1/me')
    console.log(userDAO)
    return User.deserialize(userDAO)
  }
}
