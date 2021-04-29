import {
  spotifyAppContainer,
  Auth,
  AppDependencies,
  CacheService,
} from 'spotify-core';
import NativeSpotifyAuthService from './app/dependencies/NativeSpotifyAuthService';
import {NativeCacheService} from './app/dependencies';
import {buildProviderModule} from 'inversify-binding-decorators';

spotifyAppContainer
  .bind<Auth.SpotifyAuthService>(AppDependencies.SPOTIFY_AUTH_SERVICE)
  .to(NativeSpotifyAuthService)
  .inSingletonScope();

spotifyAppContainer
  .bind<CacheService>(AppDependencies.CACHE_SERVICE)
  .to(NativeCacheService);

spotifyAppContainer.load(buildProviderModule());
