export type UserDAO = {
  readonly firstName: string,
  readonly lastName: string
}

export default class User {
  constructor(
    readonly firstName: string,
    readonly lastName: string) {
    debugger
  }

  get name(): string {
    return `${this.firstName} ${this.lastName}`
  }

  static deserialize(userDAO: UserDAO): User {
    return new User(userDAO.firstName, userDAO.lastName)
  }
}
