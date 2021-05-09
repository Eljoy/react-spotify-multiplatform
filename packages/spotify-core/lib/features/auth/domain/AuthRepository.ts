import { Observable } from '../../../common'
import { Entities } from '../../../entities'

export interface AuthRepository extends Observable<Entities.Token> {
  promptOauthSignInFlow(): Promise<void>

  getAuthToken(): Promise<Entities.Token>

  isSignedIn(): Promise<boolean>

  signOut(): Promise<void>
}
