import { Token } from "../entities";
import { Observable } from "../../../common";

export interface AuthService extends Observable<Token> {
  validateToken(token: Token): boolean

  promptSignInFlow(): Promise<void>

  getRedirectResult(): Promise<Token | null>

  refreshToken(): Promise<Token>
}
