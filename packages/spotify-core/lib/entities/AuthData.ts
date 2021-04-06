import { User } from './index'
import { UserDAO } from './User'

export type AuthDAO = {
  readonly token: string,
  readonly user: UserDAO
}

export default class AuthData {
  constructor(readonly token: string,
              readonly user: User) {
  }

  static deserialize(authDAO: AuthDAO): AuthData {
    return new AuthData(authDAO.token, User.deserialize(authDAO.user))
  }
}
