import { JsonProperty, SerializableEntity } from 'ts-jackson'
import { Image } from '../image'

export default class PlaylistPreview extends SerializableEntity {
  @JsonProperty({ required: true })
  id: string

  @JsonProperty()
  name: string

  @JsonProperty()
  description: string

  @JsonProperty('images[0]')
  backgroundImage: Image

  @JsonProperty()
  href: string

  @JsonProperty({ required: true })
  tracks: {
    href: string
    total: number
  }
}
