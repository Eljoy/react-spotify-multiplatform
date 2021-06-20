import { inject } from 'inversify'
import parse from 'url-parse'
import { LinkingService, Observable } from '../../../../common'
import { AppDependencies } from '../../../../dependencies'
import { Entities } from '../../../../entities'
import { spotifyAppDecorators } from '../../../../inversify.config'
import { AuthRepository, AuthService } from '../../domain'
import { AuthCacheService } from '../cache'
import { SpotifyAuthUrlProvider } from '../providers'

@spotifyAppDecorators.provideSingleton(AppDependencies.Auth.Repository)
export default class SpotifyAuthRepository
  extends Observable<AuthRepository.Events>
  implements AuthRepository {
  private token?: Entities.Token

  @inject(AppDependencies.Auth.Service)
  private readonly authService: AuthService

  @inject(AppDependencies.Auth.CacheService)
  private readonly cacheService: AuthCacheService

  @inject(AppDependencies.Auth.UrlProvider)
  private readonly urlProvider: SpotifyAuthUrlProvider

  constructor(
    @inject(AppDependencies.Common.LinkingService)
    private readonly linkingService: LinkingService
  ) {
    super()
    this.linkingService.onRedirectResult(this.handleRedirect.bind(this))
  }

  async signIn(): Promise<void> {
    await this.linkingService.openUrl(this.urlProvider.getAuthUrl())
  }

  async isSignedIn(): Promise<boolean> {
    const token = await this.getAuthToken()
    return Boolean(token)
  }

  async getAuthToken(): Promise<Entities.Token | null> {
    try {
      const cachedToken = await this.getCachedToken()
      let tokenFromRedirect
      if (!cachedToken) {
        const redirectUrl = await this.linkingService.getInitialUrl()
        tokenFromRedirect = await this.getTokenFromRedirectUrl(redirectUrl)
      }
      let token = cachedToken || tokenFromRedirect
      if (token !== null && !this.authService.validateToken(token)) {
        token = await this.authService.refreshToken(token)
      }
      await this.setToken(token)
      return token
    } catch (e) {
      console.log(e)
      return null
    }
  }

  async signOut(): Promise<void> {
    await this.removeToken()
    this.notify({
      name: AuthRepository.EventNames.SignedOut,
      value: null,
    })
  }

  private async handleRedirect({ url }: { url: string }): Promise<void> {
    const tokenFromRedirect = await this.getTokenFromRedirectUrl(url)
    if (tokenFromRedirect !== null) {
      await this.setToken(tokenFromRedirect)
    }
  }

  private async getTokenFromRedirectUrl(
    redirectUrl: string
  ): Promise<Entities.Token | null> {
    try {
      const parsedUrl = parse(redirectUrl.replace('#', '?'), true)
      const { code } = Entities.RequestCode.deserialize(parsedUrl.query)
      return this.authService.requestToken(
        code,
        this.urlProvider.getRedirectUri()
      )
    } catch (e) {
      console.log(e)
      return null
    }
  }

  private async getCachedToken(): Promise<Entities.Token | null> {
    return Boolean(this.token) ? this.token : await this.cacheService.getToken()
  }

  private async removeToken() {
    this.token = null
    await this.cacheService.removeToken()
  }

  private async setToken(token: Entities.Token) {
    if (this.token === token) {
      return
    }
    if (!this.token) {
      this.notify({
        name: AuthRepository.EventNames.SignedIn,
        value: token,
      })
    } else {
      this.notify({
        name: AuthRepository.EventNames.TokenRefreshed,
        value: token,
      })
    }
    this.token = token
    await this.cacheService.putToken(token)
  }
}
