import { Observable } from '../../../../common'
import { Entities } from '../../../../entities'
import { AuthService } from '../../domain'

export default abstract class SpotifyAuthService
  extends Observable<Entities.Token>
  implements AuthService {
  abstract getRedirectResult(): Promise<Entities.Token | null>

  abstract promptSignInFlow(): Promise<void>

  validateToken(token: Entities.Token): boolean {
    return true
  }

  refreshToken(): Promise<Entities.Token> {
    return Promise.resolve(undefined)
  }
}
