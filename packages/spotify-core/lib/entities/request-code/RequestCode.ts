import { JsonProperty, SerializableEntity } from 'ts-jackson'

export default class RequestCode extends SerializableEntity {
  @JsonProperty({ required: true })
  code: string

  @JsonProperty()
  state: string
}
