import { provide } from 'inversify-binding-decorators'
import { AppDependencies } from '../../../../dependencies'
import { Entities } from '../../../../entities'
import { spotifyAppDecorators } from '../../../../inversify.config'
import { AuthApi, AuthService } from '../../domain'

@provide(AppDependencies.Auth.Service)
export default class SpotifyAuthService implements AuthService {
  @spotifyAppDecorators.lazyInject(AppDependencies.Auth.Api)
  private readonly authApi: AuthApi

  validateToken(token: Entities.Token): boolean {
    const expiresAt = token.expiresAt.getTime()
    return Boolean(expiresAt - Date.now())
  }

  refreshToken(token: Entities.Token): Promise<Entities.Token> {
    return this.authApi.refreshToken(token)
  }

  requestToken(code: string, redirectUri: string): Promise<Entities.Token> {
    return this.authApi.requestToken(code, redirectUri)
  }
}
