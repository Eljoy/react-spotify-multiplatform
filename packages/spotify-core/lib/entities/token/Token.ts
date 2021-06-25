import { JsonProperty, SerializableEntity } from 'ts-jackson'

export default class Token extends SerializableEntity {
  @JsonProperty({ path: 'access_token', required: true })
  public readonly accessToken: string

  @JsonProperty({ path: 'token_type', required: true })
  public readonly tokenType: string

  @JsonProperty({ path: 'expires_in', required: true })
  public readonly expiresIn: number

  @JsonProperty<Date>({
    path: 'expires_at',
    afterDeserialize: (deserializedInstance: Token, propertyValue) => {
      if (propertyValue) {
        return propertyValue
      }
      const expiresAtTimestamp =
        Date.now() + deserializedInstance.expiresIn * 1000
      return new Date(expiresAtTimestamp)
    },
  })
  public readonly expiresAt: Date

  @JsonProperty({ path: 'refresh_token' })
  public readonly refreshToken: string
}
