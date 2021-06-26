import {injectable} from 'inversify';
import {Linking} from 'react-native';
import {LinkingService} from 'spotify-core';

@injectable()
export default class NativeLinkingService implements LinkingService {
  getInitialUrl(): Promise<string | null> {
    return Linking.getInitialURL();
  }

  onRedirectResult(onRedirectCallback: (result: {url: string}) => void): void {
    Linking.addEventListener('url', onRedirectCallback);
  }

  openUrl(url: string): Promise<void> {
    return Linking.openURL(url);
  }
}
