import { inject } from 'inversify'
import { CacheService, Observable, observableValue } from '../../../common'
import { AppDependencies } from '../../../dependencies'
import { spotifyAppDecorators } from '../../../inversify.config'
import { AuthRepository, AuthService } from '../domain'
import { Token } from '../entities'

@spotifyAppDecorators.provideSingleton(AppDependencies.SPOTIFY_AUTH_REPOSITORY)
export class SpotifyAuthRepository
  extends Observable<Token>
  implements AuthRepository {
  @observableValue()
  private token?: Token

  @inject(AppDependencies.CACHE_SERVICE)
  private cacheService: CacheService

  constructor(
    @inject(AppDependencies.SPOTIFY_AUTH_SERVICE)
    private authService: AuthService
  ) {
    super()
    authService.subscribe(this.setToken.bind(this))
  }

  async signOut(): Promise<void> {
    await this.setToken(null)
  }

  promptOauthSignInFlow = async () => {
    await this.authService.promptSignInFlow()
  }

  async isSignedIn(): Promise<boolean> {
    const token = await this.getAuthToken()
    return Boolean(token)
  }

  getAuthToken = async (): Promise<Token | null> => {
    switch (true) {
      case Boolean(this.token):
        break
      case (await this.getTokenFromRedirectResult()) !== null:
        break
      case (await this.getTokenFromCache()) !== null:
        break
      case true:
        return null
    }
    if (!this.authService.validateToken(this.token)) {
      const token = await this.authService.refreshToken()
      await this.setToken(token)
    }
    return this.token
  }

  private async getTokenFromRedirectResult(): Promise<Token | null> {
    this.token = await this.authService.getRedirectResult()
    if (this.token) {
      await this.setToken(this.token)
    }
    return this.token
  }

  private async getTokenFromCache(): Promise<Token | null> {
    this.token = await this.cacheService.getToken()
    return this.token
  }

  private async setToken(token: Token) {
    this.token = token
    this.notify(token)
    if (token) {
      await this.cacheService.putToken(token)
    } else {
      await this.cacheService.removeToken()
    }
  }
}
