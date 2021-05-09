import { deserialize, JsonProperty } from 'ts-jackson'
import Entity from '../Entity'

export default class Token extends Entity {
  @JsonProperty({ path: 'access_token', required: true })
  public readonly accessToken: string

  @JsonProperty({ path: 'token_type', required: true })
  public readonly tokenType: string

  @JsonProperty({ path: 'expires_in', required: true })
  public readonly expiresIn: number

  static deserialize(tokenDao: Record<string, unknown>): Token {
    return deserialize(tokenDao, Token)
  }
}
