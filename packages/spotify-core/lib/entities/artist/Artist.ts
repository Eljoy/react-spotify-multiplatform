import { JsonProperty, Serializable, SerializableEntity } from 'ts-jackson'

@Serializable()
export default class Artist extends SerializableEntity {
  @JsonProperty()
  id: string

  @JsonProperty()
  name: string

  @JsonProperty()
  href: string
}
