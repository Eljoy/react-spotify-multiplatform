import Entity from "./Entity";
import { JsonProperty, deserialize } from "typescript-json-serializer";
import Image from "./Image";
import Track from "./Track";

export default class Playlist extends Entity {
  @JsonProperty({ required: true })
  readonly id: string;

  @JsonProperty()
  readonly name: string;

  @JsonProperty()
  readonly description: string;

  @JsonProperty()
  readonly images: Image[];

  @JsonProperty({ required: true })
  readonly tracks: {
    items: Track[]
  };

  static deserialize(playlistDao: Record<string, unknown>): Playlist {
    return deserialize(playlistDao, Playlist);
  }
}