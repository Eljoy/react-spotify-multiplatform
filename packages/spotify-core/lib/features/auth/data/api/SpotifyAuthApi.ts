import { inject } from 'inversify'
import { provide } from 'inversify-binding-decorators'
import { ApiClient, ApiClientBuilder } from '../../../../api'
import { AppDependencies } from '../../../../dependencies'
import { Entities } from '../../../../entities'
import { AuthApi } from '../../domain'

@provide(AppDependencies.Auth.Api)
export default class SpotifyAuthApi implements AuthApi {
  private apiClient: ApiClient

  constructor(
    @inject(AppDependencies.Common.ApiClientBuilder)
    apiClientBuilder: ApiClientBuilder
  ) {
    this.apiClient = apiClientBuilder
      .withRetryRequest()
      .withBasicAuthHeader()
      .build()
  }

  async refreshToken(token: Entities.Token): Promise<Entities.Token> {
    const { data: refreshedToken } = await this.apiClient.post(
      'https://accounts.spotify.com/api/token',
      {
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    return Entities.Token.deserialize(refreshedToken)
  }

  async requestToken(
    code: string,
    redirectUri: string
  ): Promise<Entities.Token> {
    const { data: token } = await this.apiClient.post(
      'https://accounts.spotify.com/api/token',
      {
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }
    )
    return Entities.Token.deserialize(token)
  }
}
