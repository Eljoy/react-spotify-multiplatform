import { inject } from 'inversify'
import { provide } from 'inversify-binding-decorators'
import { ApiClientBuilder } from '../../../../api'
import { AppDependencies } from '../../../../dependencies'
import { Entities } from '../../../../entities'
import { AuthApi } from '../../domain'

@provide(AppDependencies.Auth.Api)
export default class SpotifyAuthApi implements AuthApi {
  private apiClient: ApiClientBuilder.ApiClient

  constructor(
    @inject(AppDependencies.Common.ApiClientBuilder)
    apiClientBuilder
  ) {
    this.apiClient = (apiClientBuilder as ApiClientBuilder)
      .withBasicAuthHeader()
      .withRetryRequest()
      .build()
    this.apiClient.defaults.headers['Content-Type'] =
      'application/x-www-form-urlencoded'
  }

  async refreshToken(token: Entities.Token): Promise<Entities.Token> {
    const params = new URLSearchParams()
    params.append('grant_type', 'refresh_token')
    params.append('refresh_token', token.refreshToken)
    const { data: refreshedToken } = await this.apiClient.post(
      'https://accounts.spotify.com/api/token',
      params.toString()
    )
    return Entities.Token.deserialize(refreshedToken)
  }

  async requestToken(
    code: string,
    redirectUri: string
  ): Promise<Entities.Token> {
    const params = new URLSearchParams()
    params.append('code', code)
    params.append('grant_type', 'authorization_code')
    params.append('redirect_uri', redirectUri)
    const { data: tokenJson } = await this.apiClient.post(
      'https://accounts.spotify.com/api/token',
      params.toString()
    )
    return Entities.Token.deserialize(tokenJson)
  }
}
