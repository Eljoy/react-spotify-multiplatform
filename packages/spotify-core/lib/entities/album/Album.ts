import { JsonProperty, Serializable, SerializableEntity } from 'ts-jackson'
import { Artist } from '../artist'
import { Image } from '../image'

@Serializable()
export default class Album extends SerializableEntity {
  @JsonProperty({ required: true })
  id: string

  @JsonProperty({ required: true })
  name: string

  @JsonProperty('images[0]')
  backgroundImage: Image

  @JsonProperty('images[2]')
  thumbnail: Image

  @JsonProperty()
  artists: Artist[]

  @JsonProperty('release_date')
  releaseDate: string

  @JsonProperty('total_tracks')
  totalTracks: number

  @JsonProperty()
  href: string
}
