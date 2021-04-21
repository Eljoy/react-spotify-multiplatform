import { JsonProperty, Serializable, deserialize, serialize } from "typescript-json-serializer";

@Serializable()
export default class Token {
  @JsonProperty({ name: "access_token", required: true })
  public readonly accessToken: string;

  @JsonProperty({ name: "token_type", required: true })
  public readonly tokenType: string;

  @JsonProperty({ name: "expires_in", required: true })
  public readonly expiresIn: number;

  static deserialize(tokenDAO: Record<string, unknown>): Token {
    return deserialize(tokenDAO, Token);
  }

  serialize(): Record<string, unknown> {
    return serialize(this);
  }

  toString(): string {
    return JSON.stringify(this);
  }
}
