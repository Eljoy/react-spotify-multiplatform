import { buildProviderModule } from 'inversify-binding-decorators'
import {
  AppDependencies,
  Auth,
  CacheService,
  spotifyAppContainer,
} from 'spotify-core'
import { WebCacheService, WebSpotifyAuthService } from './app/dependencies'

spotifyAppContainer
  .bind<Auth.SpotifyAuthService>(AppDependencies.Auth.Service)
  .to(WebSpotifyAuthService)
  .inSingletonScope()

spotifyAppContainer
  .bind<CacheService>(AppDependencies.Common.CacheService)
  .to(WebCacheService)

spotifyAppContainer.load(buildProviderModule())
