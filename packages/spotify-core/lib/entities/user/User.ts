import { JsonProperty, SerializableEntity } from 'ts-jackson'
import { Image } from '../image'

export default class User extends SerializableEntity {
  @JsonProperty()
  id: string

  @JsonProperty({ path: 'display_name', required: true })
  name: string

  @JsonProperty()
  email: string

  @JsonProperty({ required: true })
  images: Image[]
}
