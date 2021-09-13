import { JsonProperty, SerializableEntity } from 'ts-jackson'

export default class Image extends SerializableEntity {
  @JsonProperty()
   height?: number

  @JsonProperty()
   width?: number

  @JsonProperty({ required: true })
   url: string
}
