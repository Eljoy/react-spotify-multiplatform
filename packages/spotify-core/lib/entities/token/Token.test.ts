import { serialize } from 'ts-jackson'
import Token from './Token'

describe('Token', () => {
  it('should throw Error if provided data for serialization if incorrect', () => {
    expect(() => Token.deserialize({ access_token: undefined })).toThrow()
  })

  it('should correctly deserialize to Token when proper data is provided', () => {
    const tokenData = {
      accessToken: '234dewwf',
      expiresIn: 3600,
      tokenType: 'Bearer',
    }
    const token = Token.deserialize({
      access_token: tokenData.accessToken,
      expires_in: tokenData.expiresIn.toString(),
      token_type: tokenData.tokenType,
    })
    expect(token).toMatchObject(tokenData)
  })

  it('should correctly serialize to json', () => {
    const tokenJSON = {
      access_token: '234dewwf',
      expires_in: 2,
      token_type: 'Bearer',
    }
    const token = Token.deserialize(tokenJSON)
    console.log(token)
    expect(serialize(token)).toMatchObject(tokenJSON)
  })
})
