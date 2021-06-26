import urlParse from 'url-parse'
import { required } from '../../../../common'

export enum Scopes {
  ugcImageUpload = 'ugc-image-upload',
  userReadRecentlyPlayed = 'user-read-recently-played',
  userTopRead = 'user-top-read',
  userReadPlaybackPosition = 'user-read-playback-position',
  userReadPlaybackState = 'user-read-playback-state',
  userModifyPlaybackState = 'user-modify-playback-state',
  userReadCurrentlyPlaying = 'user-read-currently-playing',
  appRemoteControl = 'app-remote-control',
  streaming = 'streaming',
  playlistModifyPublic = 'playlist-modify-public',
  playlistModifyPrivate = 'playlist-modify-private',
  playlistReadPrivate = 'playlist-read-private',
  playlistReadCollaborative = 'playlist-read-collaborative',
  userFollowModify = 'user-follow-modify',
  userFollowRead = 'user-follow-read',
  userLibraryModify = 'user-library-modify',
  userLibraryRead = 'user-library-read',
  userReadEmail = 'user-read-email',
  userReadPrivate = 'user-read-private',
}

export enum ResponseType {
  token = 'token',
  code = 'code',
}

export default class SpotifyAuthUrlProvider {
  @required()
  private clientId: string
  @required()
  private redirectUri: string
  private responseType: ResponseType = ResponseType.code
  private scopes: Scopes[] = []

  static create(): SpotifyAuthUrlProvider {
    return new SpotifyAuthUrlProvider()
  }

  addScope(scope: Scopes): SpotifyAuthUrlProvider {
    this.scopes.push(scope)
    return this
  }

  addScopes(scopes: Scopes[]): SpotifyAuthUrlProvider {
    this.scopes = [...this.scopes, ...scopes]
    return this
  }

  setClientId(clientId: string): SpotifyAuthUrlProvider {
    this.clientId = clientId
    return this
  }

  setResponseType(responseType: ResponseType): SpotifyAuthUrlProvider {
    this.responseType = responseType
    return this
  }

  setRedirectUri(redirectUri: string): SpotifyAuthUrlProvider {
    this.redirectUri = redirectUri
    return this
  }

  getRedirectUri(): string {
    return this.redirectUri
  }

  getAuthUrl(): string {
    const authUrl = urlParse('https://accounts.spotify.com/authorize')
    authUrl.set('query', {
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: this.scopes,
      response_type: this.responseType,
    })
    return authUrl.toString()
  }
}
