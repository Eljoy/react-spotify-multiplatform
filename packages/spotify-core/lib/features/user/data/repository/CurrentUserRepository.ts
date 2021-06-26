import { inject } from 'inversify'
import { AppDependencies } from '../../../../dependencies'
import { Entities } from '../../../../entities'
import { spotifyAppDecorators } from '../../../../inversify.config'
import { UserProfileApi } from '../api'
import { UserCacheService } from '../cache'

@spotifyAppDecorators.provideSingleton(
  AppDependencies.User.CurrentUserRepository
)
export default class CurrentUserRepository {
  private currentUser: Entities.User = null

  @inject(AppDependencies.User.Api)
  private userProfileApi: UserProfileApi

  @inject(AppDependencies.User.CacheService)
  private userCacheService: UserCacheService

  async getCurrentUser(): Promise<Entities.User | null> {
    this.currentUser ||= await this.userCacheService.getCurrentUser()
    if (!this.currentUser) {
      this.currentUser = await this.userProfileApi.fetchCurrentUser()
    }
    return this.currentUser
  }

  async removeCurrentUser(): Promise<void> {
    this.currentUser = null
    await this.userCacheService.removeCurrentUser()
  }
}
