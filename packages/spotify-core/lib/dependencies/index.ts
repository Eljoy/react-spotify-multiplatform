export const AppDependencies = Object.freeze({
  Auth: {
    Service: 'AuthService',
    Repository: 'AuthRepository',
  },
  FeaturedPlaylist: {
    Repository: 'FeaturedPlaylistsRepository',
    Api: 'FeaturedPlaylistApi',
  },
  Playlist: {
    Api: 'PlaylistApi',
    Repository: 'PlaylistRepository',
  },
  User: {
    CacheService: 'UserCacheService',
    CurrentUserRepository: 'CurrentUserRepository',
    Api: 'Api',
  },
  Common: {
    ApiClientBuilder: 'ApiClientBuilder',
    CacheService: 'CacheService',
  },
})
