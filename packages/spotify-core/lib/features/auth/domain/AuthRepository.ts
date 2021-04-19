import { Token } from '../entities'
import { Observable } from '../../../helpers'

export interface AuthRepository extends Observable<Token> {
  promptOauthSignInFlow(): Promise<void>

  getAuthToken(): Promise<Token>
}
