import { AuthService } from "../domain";
import { Token } from "../entities";
import { Observable } from "../../../common";

export default abstract class SpotifyAuthService extends Observable<Token> implements AuthService {
  abstract getRedirectResult(): Promise<Token | null>;

  abstract promptSignInFlow(): Promise<void>;

  validateToken(token:Token): boolean {
    return true;
  }

  refreshToken(): Promise<Token> {
    return Promise.resolve(undefined);
  }
}
