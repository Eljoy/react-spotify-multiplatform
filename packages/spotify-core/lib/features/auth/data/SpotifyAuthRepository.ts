import { CacheService, Observable, observableValue } from "../../../common";
import { Token } from "../entities";
import { AuthRepository, AuthService } from "../domain";
import { inject, injectable } from "inversify";
import { AppDependencies } from "../../../dependencies";

@injectable()
export class SpotifyAuthRepository extends Observable<Token> implements AuthRepository {
  token?: Token;

  @inject(AppDependencies.CACHE_SERVICE)
  private cacheService: CacheService;

  constructor(@inject(AppDependencies.SPOTIFY_AUTH_SERVICE)
              private authService: AuthService) {
    super();
    authService.subscribe(this.setToken.bind(this))
  }

  promptOauthSignInFlow = async () => {
    await this.authService.promptSignInFlow();
  };

  async isSignedIn(): Promise<boolean> {
    const token = await this.getAuthToken()
    return token !== null;
  }

  getAuthToken = async (): Promise<Token | null> => {
    switch (true) {
      case Boolean(this.token):
        break;
      case await this.getTokenFromRedirectResult() !== null:
        break;
      case await this.getTokenFromCache() !== null:
        break;
      case true:
        return null;
    }
    if (!this.authService.validateToken(this.token)) {
      const token = await this.authService.refreshToken();
      await this.setToken(token);
    }
    return this.token;
  };

  private async getTokenFromRedirectResult(): Promise<Token | null> {
    const token = await this.authService.getRedirectResult();
    if (token !== null) {
      await this.setToken(token)
    }
    return token;
  }

  private async getTokenFromCache(): Promise<Token | null> {
    this.token = await this.cacheService.getToken();
    return this.token;
  }

  private async setToken(token: Token) {
    this.token = token;
    this.notify(token)
    await this.cacheService.putToken(token);
  }
}

