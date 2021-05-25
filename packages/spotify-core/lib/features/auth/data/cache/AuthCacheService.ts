import { inject } from 'inversify'
import { provide } from 'inversify-binding-decorators'
import { AppDependencies } from '../../../../dependencies'
import { Entities } from '../../../../entities'

enum Keys {
  Token = 'Token',
}

@provide(AppDependencies.Auth.CacheService)
export default class AuthCacheService {
  @inject(AppDependencies.Common.CacheService)
  private cacheService

  async getToken(): Promise<Entities.Token | null> {
    const tokenJson: Record<string, unknown> = await this.cacheService.get(
      Keys.Token
    )
    return tokenJson ? Entities.Token.deserialize(tokenJson) : null
  }

  async putToken(token: Entities.Token): Promise<void> {
    this.cacheService.put(Keys.Token, token)
  }

  async removeToken(): Promise<void> {
    return this.cacheService.removeItem(Keys.Token)
  }
}
