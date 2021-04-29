import { inject } from 'inversify'
import { provide } from 'inversify-binding-decorators'
import { ApiClient, ApiClientBuilder } from '../../../../api'
import { AppDependencies } from '../../../../dependencies'
import { User } from '../../entities'

@provide(AppDependencies.User.Api)
export default class UserProfileApi {
  private apiClient: ApiClient

  constructor(
    @inject(AppDependencies.User.Api)
    apiClientBuilder: ApiClientBuilder
  ) {
    this.apiClient = apiClientBuilder
      .withRetryRequest()
      .withAuthHeader()
      .build()
  }

  async fetchCurrentUser(): Promise<User> {
    const { data: userDAO } = await this.apiClient.get(
      'https://api.spotify.com/v1/me'
    )
    console.log(userDAO)
    return User.deserialize(userDAO)
  }
}
