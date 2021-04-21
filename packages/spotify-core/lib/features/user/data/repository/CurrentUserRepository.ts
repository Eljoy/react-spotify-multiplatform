import { inject, injectable } from "inversify";
import { UserProfileApi } from "../api";
import { AppDependencies } from "../../../../dependencies";
import { UserCacheService } from "../cache";
import { User } from "../../entities";

@injectable()
export default class CurrentUserRepository {
  private currentUser: User = null;

  @inject(AppDependencies.USER_PROFILE_API)
  private userProfileApi: UserProfileApi;

  @inject(AppDependencies.USER_CACHE_SERVICE)
  private userCacheService: UserCacheService;

  async getCurrentUser(): Promise<User | null> {
    this.currentUser ||= await this.userCacheService.getCurrentUser();
    if (!this.currentUser) {
      this.currentUser = await this.userProfileApi.fetchCurrentUser();
    }
    return this.currentUser;
  }

  async removeCurrentUser(): Promise<void> {
    this.currentUser = null
    await this.userCacheService.removeCurrentUser()
  }
}
