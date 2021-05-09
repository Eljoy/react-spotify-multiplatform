import { deserialize, JsonProperty } from 'ts-jackson'
import Entity from '../Entity'
import { Image } from '../image'

export default class User extends Entity {
  @JsonProperty()
  id: string

  @JsonProperty({ path: 'display_name', required: true })
  name: string

  @JsonProperty()
  email: string

  @JsonProperty({ required: true })
  images: Image[]

  static deserialize(userDao: Record<string, unknown>): User {
    return deserialize(userDao, User)
  }
}
