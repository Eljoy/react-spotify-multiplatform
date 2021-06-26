import { injectable } from 'inversify'
import { Auth, Entities } from 'spotify-core'
import parse from 'url-parse'
require('dotenv').config()

const spotifyAuthUrlProvider = Auth.SpotifyAuthUrlProvider.create()
  .addScopes([Auth.Scopes.userLibraryRead, Auth.Scopes.streaming])
  .setClientId(process.env.CLIENT_ID as string)
  .setRedirectUri(process.env.REDIRECT_URL as string)

@injectable()
export default class WebSpotifyAuthService extends Auth.SpotifyAuthService {
  async promptSignInFlow(): Promise<Entities.RequestCode | null> {
    try {
      const parsedUrl = parse(window.location.href.replace('#', '?'), true)
      return Entities.RequestCode.deserialize(parsedUrl.query)
    } catch (e) {
      console.log(e)
      window.location.href = spotifyAuthUrlProvider.getAuthUrl()
      return null
    }
  }
}
