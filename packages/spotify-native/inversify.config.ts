import {
  REACT_APP_CLIENT_ID,
  REACT_APP_CLIENT_SECRET,
  REACT_APP_REDIRECT_URL,
} from '@env';
import {buildProviderModule} from 'inversify-binding-decorators';
import {
  AppDependencies,
  Auth,
  CacheService,
  Config,
  LinkingService,
  spotifyAppContainer,
} from 'spotify-core';
import {NativeCacheService, NativeLinkingService} from './app/dependencies';

spotifyAppContainer
  .bind<CacheService>(AppDependencies.Common.CacheService)
  .to(NativeCacheService);

spotifyAppContainer
  .bind<LinkingService>(AppDependencies.Common.LinkingService)
  .to(NativeLinkingService);

const spotifyAuthUrlProvider = Auth.SpotifyAuthUrlProvider.create()
  .addScopes([Auth.Scopes.userLibraryRead, Auth.Scopes.streaming])
  .setClientId(REACT_APP_CLIENT_ID)
  .setRedirectUri(REACT_APP_REDIRECT_URL);

spotifyAppContainer
  .bind<Auth.SpotifyAuthUrlProvider>(AppDependencies.Auth.UrlProvider)
  .toConstantValue(spotifyAuthUrlProvider);

spotifyAppContainer
  .bind<Config>(AppDependencies.Common.Config)
  .toConstantValue({
    CLIENT_ID: REACT_APP_CLIENT_ID as string,
    CLIENT_SECRET: REACT_APP_CLIENT_SECRET as string,
    REDIRECT_URL: REACT_APP_REDIRECT_URL as string,
  });

spotifyAppContainer.load(buildProviderModule());
