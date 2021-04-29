import {
  spotifyAppContainer,
  Auth,
  AppDependencies,
  CacheService,
} from 'spotify-core'
import { WebCacheService, WebSpotifyAuthService } from './app/dependencies'
import { buildProviderModule } from 'inversify-binding-decorators'

spotifyAppContainer
  .bind<Auth.SpotifyAuthService>(AppDependencies.SPOTIFY_AUTH_SERVICE)
  .to(WebSpotifyAuthService)
  .inSingletonScope()

spotifyAppContainer
  .bind<CacheService>(AppDependencies.CACHE_SERVICE)
  .to(WebCacheService)

spotifyAppContainer.load(buildProviderModule())
