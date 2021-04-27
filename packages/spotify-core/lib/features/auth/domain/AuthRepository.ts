import { Token } from '../entities'
import { Observable } from '../../../common'

export interface AuthRepository extends Observable<Token> {
  promptOauthSignInFlow(): Promise<void>

  getAuthToken(): Promise<Token>

  isSignedIn(): Promise<boolean>

  signOut(): Promise<void>
}
