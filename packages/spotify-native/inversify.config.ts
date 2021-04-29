import {buildProviderModule} from 'inversify-binding-decorators';
import {
  AppDependencies,
  Auth,
  CacheService,
  spotifyAppContainer,
} from 'spotify-core';
import {NativeCacheService} from './app/dependencies';
import NativeSpotifyAuthService from './app/dependencies/NativeSpotifyAuthService';

spotifyAppContainer
  .bind<Auth.SpotifyAuthService>(AppDependencies.Auth.Service)
  .to(NativeSpotifyAuthService)
  .inSingletonScope();

spotifyAppContainer
  .bind<CacheService>(AppDependencies.Common.CacheService)
  .to(NativeCacheService);

spotifyAppContainer.load(buildProviderModule());
