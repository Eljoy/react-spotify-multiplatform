import { spotifyAppContainer, Auth, AppDependencies } from 'spotify-core'
import NativeSpotifyOauthService from './app/dependencies/NativeSpotifyOauthService'

spotifyAppContainer
  .bind<Auth.OauthService>(AppDependencies.SPOTIFY_OAUTH_SERVICE)
  .to(NativeSpotifyOauthService)
  .inSingletonScope()
