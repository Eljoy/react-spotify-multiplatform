import { Entity } from "../../../entities";
import { JsonProperty, deserialize } from "typescript-json-serializer";
import { Image } from "../../../entities";

export default class User extends Entity {
  @JsonProperty()
  id: string;

  @JsonProperty({ name: "display_name", required: true })
  name: string;

  @JsonProperty()
  email: string;

  @JsonProperty({ required: true })
  images: Image[];

  static deserialize(userDao: Record<string, unknown>): User {
    return deserialize(userDao, User);
  }
}
