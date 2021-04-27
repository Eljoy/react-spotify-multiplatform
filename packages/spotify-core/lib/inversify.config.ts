import { Container } from 'inversify'
import { Auth, UserFeature, FeaturedPlaylistsFeature, PlaylistFeature } from './features'
import { AppDependencies } from './dependencies'
import getDecorators from "inversify-inject-decorators";
import { ApiClientBuilder } from "./api";

const spotifyAppContainer = new Container({ skipBaseClassChecks: true })

spotifyAppContainer
  .bind<Auth.AuthRepository>(AppDependencies.SPOTIFY_AUTH_REPOSITORY)
  .to(Auth.SpotifyAuthRepository)
  .inSingletonScope()

spotifyAppContainer
  .bind<ApiClientBuilder>(AppDependencies.API_CLIENT_BUILDER)
  .to(ApiClientBuilder)

spotifyAppContainer
  .bind<UserFeature.UserProfileApi>(AppDependencies.USER_PROFILE_API)
  .to(UserFeature.UserProfileApi)
  .inSingletonScope()

spotifyAppContainer
  .bind<FeaturedPlaylistsFeature.FeaturedPlaylistsApi>(AppDependencies.FEATURED_PLAYLIST_API)
  .to(FeaturedPlaylistsFeature.FeaturedPlaylistsApi)
  .inSingletonScope()

spotifyAppContainer
  .bind<FeaturedPlaylistsFeature.FeaturedPlaylistsRepository>(AppDependencies.FEATURED_PLAYLISTS_REPOSITORY)
  .to(FeaturedPlaylistsFeature.FeaturedPlaylistsRepository)
  .inSingletonScope()

spotifyAppContainer
  .bind<UserFeature.UserCacheService>(AppDependencies.USER_CACHE_SERVICE)
  .to(UserFeature.UserCacheService)
  .inSingletonScope()

spotifyAppContainer
  .bind<UserFeature.CurrentUserRepository>(AppDependencies.CURRENT_USER_REPOSITORY)
  .to(UserFeature.CurrentUserRepository)
  .inSingletonScope()

spotifyAppContainer
  .bind<PlaylistFeature.PlaylistApi>(AppDependencies.PLAYLIST_API)
  .to(PlaylistFeature.PlaylistApi)
  .inSingletonScope()

spotifyAppContainer
  .bind<PlaylistFeature.PlaylistRepository>(AppDependencies.PLAYLIST_REPOSITORY)
  .to(PlaylistFeature.PlaylistRepository)
  .inSingletonScope()

const spotifyAppDecorators = getDecorators(spotifyAppContainer, false);
export { spotifyAppContainer, spotifyAppDecorators }
