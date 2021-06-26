import { serialize } from 'ts-jackson'
import Token from './Token'

describe('Token', () => {
  it('should throw Error if provided data for serialization if incorrect', () => {
    expect(() => Token.deserialize({ access_token: undefined })).toThrow()
  })

  const tokenJSON = {
    access_token: '234dewwf',
    refresh_token: '2fed2oekio2',
    expires_in: 3600,
    token_type: 'Bearer',
  }

  it('should correctly deserialize to Token when proper data is provided', () => {
    const token = Token.deserialize(tokenJSON)
    expect(token).toMatchObject({
      accessToken: tokenJSON.access_token,
      refreshToken: tokenJSON.refresh_token,
      expiresIn: tokenJSON.expires_in,
      expiresAt: expect.any(Date),
      tokenType: tokenJSON.token_type,
    })
    const expiresAt = Date.now() + tokenJSON.expires_in * 1000
    expect(token.expiresAt.getTime()).toBeLessThanOrEqual(expiresAt)
    expect(token.expiresAt.getTime()).toBeGreaterThanOrEqual(expiresAt - 100)
  })

  test('serialize', () => {
    const token = Token.deserialize(tokenJSON)
    expect(serialize(token)).toMatchObject(tokenJSON)
  })

  test('deserialize, serialize series', () => {
    const token = Token.deserialize(tokenJSON)
    const serialized = serialize(token)
    expect(serialize(token)).toMatchObject(tokenJSON)

    const deserialized = Token.deserialize(serialized)
    expect(serialize(deserialized)).toEqual(serialized)
  })
})
