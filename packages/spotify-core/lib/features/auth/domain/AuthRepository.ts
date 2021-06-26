import { Observable } from '../../../common'
import { Entities } from '../../../entities'

enum AuthEventNames {
  SignedIn = 'SignedIn',
  SignedOut = 'SignedOut',
  TokenRefreshed = 'TokenRefreshed',
}

type SignedInEvent = Observable.Event<AuthEventNames.SignedIn, Entities.Token>
type SignedOutEvent = Observable.Event<AuthEventNames.SignedOut, null>
type TokenRefreshedEvent = Observable.Event<
  AuthEventNames.TokenRefreshed,
  Entities.Token
>

export interface AuthRepository
  extends Observable<SignedInEvent | SignedOutEvent | TokenRefreshedEvent> {
  getAuthToken(): Promise<Entities.Token>

  isSignedIn(): Promise<boolean>

  signIn(): Promise<void>

  signOut(): Promise<void>
}

export namespace AuthRepository {
  export type Events = SignedInEvent | SignedOutEvent | TokenRefreshedEvent
  export import EventNames = AuthEventNames
}
