import { JsonProperty, Serializable } from "typescript-json-serializer";
import { Entity } from "../../../entities";

@Serializable()
export default class Token extends Entity {
  @JsonProperty({ name: "access_token", required: true })
  public readonly accessToken: string;

  @JsonProperty({ name: "token_type", required: true })
  public readonly tokenType: string;

  @JsonProperty({ name: "expires_in", required: true })
  public readonly expiresIn: number;
}
