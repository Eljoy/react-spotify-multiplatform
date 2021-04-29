import { inject } from 'inversify'
import { provide } from 'inversify-binding-decorators'
import { AppDependencies } from '../../../../dependencies'
import { User } from '../../entities'

enum Keys {
  CurrentUser = 'CurrentUser',
}

@provide(AppDependencies.User.CacheService)
export default class UserCacheService {
  @inject(AppDependencies.Common.CacheService)
  private cacheService

  async getCurrentUser(): Promise<User | null> {
    const userDAO: Record<string, unknown> = await this.cacheService.get(
      Keys.CurrentUser
    )
    return userDAO ? User.deserialize(userDAO) : null
  }

  async putCurrentUser(user: User): Promise<void> {
    return this.cacheService.put(Keys.CurrentUser, user.toString())
  }

  async removeCurrentUser(): Promise<void> {
    return this.cacheService.removeItem(Keys.CurrentUser)
  }
}
