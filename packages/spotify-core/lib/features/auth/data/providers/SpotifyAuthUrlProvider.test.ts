import { Scopes, SpotifyAuthUrlProvider } from '../index'

describe('SpotifyAuthProvider.ts', () => {
  it('should throw Error when clientId is not provided', () => {
    const spotifyAuthProvider = SpotifyAuthUrlProvider.create().setRedirectUri(
      'http%3A%2F%2Flocalhost%3A3000%'
    )
    expect(spotifyAuthProvider.getAuthUrl).toThrow()
  })

  it('should throw Error when redirectUrl is not provided', () => {
    const spotifyAuthProvider = SpotifyAuthUrlProvider.create().setClientId(
      'clientId'
    )
    expect(spotifyAuthProvider.getAuthUrl).toThrow()
  })

  test('proper auth url creation', () => {
    const expectedUrl =
      'https://accounts.spotify.com/authorize?client_id=06006394f03e41b9af557e5e00ab2220&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=user-library-read%2Cstreaming&response_type=token'
    const spotifyAuthProvider = SpotifyAuthUrlProvider.create()
      .addScopes([Scopes.userLibraryRead, Scopes.streaming])
      .setClientId('06006394f03e41b9af557e5e00ab2220')
      .setRedirectUri('http://localhost:3000/callback')
    expect(spotifyAuthProvider.getAuthUrl()).toEqual(expectedUrl)
  })
})
