import { inject } from 'inversify'
import { provide } from 'inversify-binding-decorators'
import { ApiClient, ApiClientBuilder } from '../../../../api'
import { AppDependencies } from '../../../../dependencies'
import { Entities } from '../../../../entities'

@provide(AppDependencies.User.Api)
export default class UserProfileApi {
  private apiClient: ApiClient

  constructor(
    @inject(AppDependencies.Common.ApiClientBuilder)
    apiClientBuilder: ApiClientBuilder
  ) {
    this.apiClient = apiClientBuilder
      .withRetryRequest()
      .withAuthBearerHeader()
      .build()
  }

  async fetchCurrentUser(): Promise<Entities.User> {
    const { data: userDAO } = await this.apiClient.get(
      'https://api.spotify.com/v1/me'
    )
    return Entities.User.deserialize(userDAO)
  }
}
