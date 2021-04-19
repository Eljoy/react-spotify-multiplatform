import { Auth, Observable } from "spotify-core";
import parse from "url-parse";
import { injectable } from "inversify";

const spotifyAuthProvider = Auth.SpotifyAuthUrlProvider
  .create()
  .addScopes([Auth.Scopes.userLibraryRead, Auth.Scopes.streaming])
  .setClientId("06006394f03e41b9af557e5e00ab2220")
  .setRedirectUri("http://localhost:3000/callback");

@injectable()
export default class WebSpotifyOauthService extends Observable<Auth.Token> implements Auth.OauthService {
  async promptSignInFlow(): Promise<void> {
    window.location.href = spotifyAuthProvider.getAuthUrl();
  }

  async getRedirectResult(): Promise<Auth.Token | null> {
    try {
      const parsedUrl = parse(window.location.href.replace("#", "?"), true);
      return Auth.Token.deserialize(parsedUrl.query as Record<string, string>);
    } catch (e) {
      return null;
    }
  }

  async promptOauthSignInFlow(): Promise<void> {
    window.location.href = spotifyAuthProvider.getAuthUrl();
  }
}
