import { JsonProperty, SerializableEntity } from 'ts-jackson'

export default class Image extends SerializableEntity {
  @JsonProperty()
  readonly height?: number

  @JsonProperty()
  readonly width?: number

  @JsonProperty({ required: true })
  readonly url: string
}
