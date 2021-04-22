import Entity from "./Entity";
import { JsonProperty, deserialize } from "typescript-json-serializer";
import Image from "./Image";

export default class Playlist extends Entity {
  @JsonProperty({ required: true })
  readonly id: string;

  @JsonProperty()
  readonly name: string;

  @JsonProperty()
  readonly description: string;

  @JsonProperty()
  readonly images: Image[];

  @JsonProperty()
  readonly href: string;

  @JsonProperty({ required: true })
  readonly tracks: {
    href: string,
    total: number
  };

  static deserialize(playlistDao: Record<string, unknown>): Playlist {
    return deserialize(playlistDao, Playlist);
  }
}
