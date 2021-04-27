import Entity from "./Entity";
import { JsonProperty, deserialize } from "typescript-json-serializer";
import Image from "./Image";
import Artist from "./Artist";

export default class Track extends Entity {
  @JsonProperty({ required: true })
  readonly id: string;

  @JsonProperty({ required: true })
  readonly href: string;

  @JsonProperty({ name: "preview_url", required: true })
  readonly previewUrl: string;

  @JsonProperty({ required: true })
  readonly images: Image[];

  @JsonProperty({ required: true })
  readonly artists: Artist[];

  @JsonProperty("duration_ms")
  readonly durationMs: number;

  static deserialize(trackDao: Record<string, unknown>): Track {
    return deserialize(trackDao, Track);
  }
}
