import { JsonProperty, Serializable, SerializableEntity } from 'ts-jackson'

@Serializable()
export default class Artist extends SerializableEntity {
  @JsonProperty()
  readonly id: string

  @JsonProperty()
  readonly name: string

  @JsonProperty()
  readonly href: string
}
