import {
  AppDependencies,
  CacheService,
  LinkingService,
  spotifyAppContainer,
} from '../'
import {
  AuthRepository,
  AuthService,
  Scopes,
  SpotifyAuthService,
  SpotifyAuthUrlProvider,
} from '../features/auth'
import AuthCacheService from '../features/auth/data/cache/AuthCacheService'
import SpotifyAuthRepository from '../features/auth/data/repository/SpotifyAuthRepository'

spotifyAppContainer
  .bind<CacheService>(AppDependencies.Common.CacheService)
  .toConstantValue({
    get: jest.fn(),

    getAllKeys: jest.fn(),

    multiRemove: jest.fn(),

    put: jest.fn(),

    removeItem: jest.fn(),
  })

spotifyAppContainer
  .bind<LinkingService>(AppDependencies.Common.LinkingService)
  .toConstantValue({
    getInitialUrl: jest.fn(),

    onRedirectResult: jest.fn(),

    openUrl: jest.fn(),
  })

spotifyAppContainer
  .bind<AuthRepository>(AppDependencies.Auth.Repository)
  .to(SpotifyAuthRepository)
  .inSingletonScope()

const spotifyAuthUrlProvider = SpotifyAuthUrlProvider.create()
  .addScopes([Scopes.userLibraryRead, Scopes.streaming])
  .setClientId('06006394f03e41b9af557e5e00ab2220')
  .setRedirectUri('http://localhost:3000/callback')

spotifyAppContainer
  .bind<SpotifyAuthUrlProvider>(AppDependencies.Auth.UrlProvider)
  .toConstantValue(spotifyAuthUrlProvider)

spotifyAppContainer
  .bind<AuthService>(AppDependencies.Auth.Service)
  .to(SpotifyAuthService)
  .inSingletonScope()

spotifyAppContainer
  .bind<AuthCacheService>(AppDependencies.Auth.CacheService)
  .to(AuthCacheService)
  .inSingletonScope()
