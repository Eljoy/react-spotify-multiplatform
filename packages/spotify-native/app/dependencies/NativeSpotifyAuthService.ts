import {injectable} from 'inversify';
import {Linking} from 'react-native';
import {Auth, Entities} from 'spotify-core';
import parse from 'url-parse';

const spotifyAuthUrlProvider = Auth.SpotifyAuthUrlProvider.create()
  .addScopes([Auth.Scopes.userLibraryRead, Auth.Scopes.streaming])
  .setClientId('06006394f03e41b9af557e5e00ab2220')
  .setRedirectUri('reactspotifymultiplatform://page.link');

@injectable()
export default class NativeSpotifyAuthService extends Auth.SpotifyAuthService {
  constructor() {
    super();
    Linking.addEventListener('url', this.handleAuthRedirect.bind(this));
  }

  async promptSignInFlow(): Promise<void> {
    await Linking.openURL(spotifyAuthUrlProvider.getAuthUrl());
  }

  async getRedirectResult(): Promise<Entities.Token | null> {
    try {
      const url = await Linking.getInitialURL();
      const parsedUrl = parse(url!!.replace('#', '?'), true);
      return Entities.Token.deserialize(
        parsedUrl.query as Record<string, string>,
      );
    } catch (e) {
      return null;
    }
  }

  private handleAuthRedirect({url}: {url: string}) {
    try {
      const parsedUrl = parse(url.replace('#', '?'), true);
      const token = Entities.Token.deserialize(
        parsedUrl.query as Record<string, string>,
      );
      // this.notify(token)
    } catch (e) {
      console.log(e);
    }
  }
}
