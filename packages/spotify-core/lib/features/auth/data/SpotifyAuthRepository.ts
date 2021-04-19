import { Observable } from "../../../helpers";
import { Token } from "../entities";
import { AuthRepository, OauthService } from "../domain";
import { inject, injectable } from "inversify";
import { AppDependencies } from "../../../dependencies";

@injectable()
export class SpotifyAuthRepository extends Observable<Token> implements AuthRepository {
  token?: Token;

  constructor(@inject(AppDependencies.SPOTIFY_OAUTH_SERVICE)
              private oauthService: OauthService) {
    super();
    this.oauthService.subscribe((token) => {
      this.token = token;
      this.notify(token);
    });
  }

  promptOauthSignInFlow = async () => {
    await this.oauthService.promptSignInFlow();
  };

  getAuthToken = async () => {
    this.token ||= await this.oauthService.getRedirectResult();
    return this.token;
  };
}

