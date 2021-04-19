import { spotifyAppContainer, Auth, AppDependencies } from 'spotify-core'
import { WebSpotifyOauthService } from "./app/dependencies";

spotifyAppContainer
  .bind<Auth.OauthService>(AppDependencies.SPOTIFY_OAUTH_SERVICE)
  .to(WebSpotifyOauthService)
  .inSingletonScope()
