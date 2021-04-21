import { inject, injectable } from "inversify";
import { AppDependencies } from "../../../../dependencies";
import { User } from "../../entities";

enum Keys {
  CurrentUser = "CurrentUser"
}

@injectable()
export default class UserCacheService {

  @inject(AppDependencies.CACHE_SERVICE)
  private cacheService;

  async getCurrentUser(): Promise<User | null> {
    const userDAO: Record<string, unknown> = await this.cacheService.get(Keys.CurrentUser);
    return userDAO ? User.deserialize(userDAO) : null;
  }

  async putCurrentUser(user: User): Promise<void> {
    return this.cacheService.put(Keys.CurrentUser, user.toString());
  }

  async removeCurrentUser(): Promise<void> {
    return this.cacheService.removeItem(Keys.CurrentUser);
  }
}
