import { Entity } from "./index";
import { JsonProperty, deserialize } from "typescript-json-serializer";

export default class Image extends Entity {
  @JsonProperty()
  readonly height: number | undefined;

  @JsonProperty()
  readonly width: number | undefined;

  @JsonProperty({ required: true })
  readonly url: string;

  static deserialize(imageDao: Record<string, unknown>): Image {
    return deserialize(imageDao, Image);
  }
}
