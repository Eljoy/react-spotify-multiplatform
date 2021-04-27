import Entity from "./Entity";
import { JsonProperty, deserialize } from "typescript-json-serializer";

export default class Artist extends Entity {
  @JsonProperty()
  readonly id: string;

  @JsonProperty()
  readonly name: string;

  @JsonProperty()
  readonly href: string;

  static deserialize(artistDao: Record<string, unknown>): Artist {
    return deserialize(artistDao, Artist);
  }
}
