import { Observable } from '../../../common'
import { Entities } from '../../../entities'

export interface AuthService extends Observable<Entities.Token> {
  validateToken(token: Entities.Token): boolean

  promptSignInFlow(): Promise<void>

  getRedirectResult(): Promise<Entities.Token | null>

  refreshToken(): Promise<Entities.Token>
}
