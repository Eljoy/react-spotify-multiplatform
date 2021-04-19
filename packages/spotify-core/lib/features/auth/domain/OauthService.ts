import { Token } from '../entities'
import { Observable } from '../../../helpers'

export interface OauthService extends Observable<Token> {
  promptSignInFlow(): Promise<void>

  getRedirectResult(): Promise<Token | null>
}
