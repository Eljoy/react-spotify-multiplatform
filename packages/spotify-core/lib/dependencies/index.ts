export const AppDependencies = Object.freeze({
  Auth: {
    Service: 'AuthService',
    Api: 'AuthApi',
    CacheService: 'AuthCacheService',
    Repository: 'AuthRepository',
    UrlProvider: 'AuthUrlProvider',
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
    LinkingService: 'LinkingService',
    Config: 'Config',
  },
})
