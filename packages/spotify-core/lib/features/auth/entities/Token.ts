import { JsonProperty, Serializable, deserialize, serialize } from 'typescript-json-serializer'

@Serializable()
export default class Token {
  @JsonProperty('access_token')
  public readonly accessToken: string

  @JsonProperty('token_type')
  public readonly tokenType: string

  @JsonProperty('expires_in')
  public readonly expiresIn: number

  static deserialize(tokenDAO: Record<string, unknown>): Token {
    const token = deserialize(tokenDAO, Token)
    if (!token.accessToken || !token.tokenType || !token.expiresIn) {
      // TODO: make a proper check
      throw Error('Empty fields!')
    }
    return token
  }

  serialize(): Record<string, unknown> {
    return serialize(this)
  }

  toString(): string {
    return JSON.stringify(this)
  }
}
