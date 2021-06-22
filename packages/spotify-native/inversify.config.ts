import {buildProviderModule} from 'inversify-binding-decorators';
import {
  AppDependencies,
  Auth,
  CacheService,
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
  .setClientId('06006394f03e41b9af557e5e00ab2220')
  .setRedirectUri('reactspotifymultiplatform://page.link');

spotifyAppContainer
  .bind<Auth.SpotifyAuthUrlProvider>(AppDependencies.Auth.UrlProvider)
  .toConstantValue(spotifyAuthUrlProvider);

spotifyAppContainer.load(buildProviderModule());
