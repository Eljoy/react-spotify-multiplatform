import { buildProviderModule } from 'inversify-binding-decorators'
import {
  AppDependencies,
  Auth,
  CacheService,
  Config,
  LinkingService,
  spotifyAppContainer,
} from 'spotify-core'
import { WebCacheService, WebLinkingService } from './app/dependencies'

const {
  REACT_APP_CLIENT_ID,
  REACT_APP_CLIENT_SECRET,
  REACT_APP_REDIRECT_URL,
} = process.env

spotifyAppContainer
  .bind<CacheService>(AppDependencies.Common.CacheService)
  .to(WebCacheService)

spotifyAppContainer
  .bind<LinkingService>(AppDependencies.Common.LinkingService)
  .to(WebLinkingService)
  .inSingletonScope()

spotifyAppContainer
  .bind<Config>(AppDependencies.Common.Config)
  .toConstantValue({
    CLIENT_ID: REACT_APP_CLIENT_ID as string,
    CLIENT_SECRET: REACT_APP_CLIENT_SECRET as string,
    REDIRECT_URL: REACT_APP_REDIRECT_URL as string,
  })

const spotifyAuthUrlProvider = Auth.SpotifyAuthUrlProvider.create()
  .addScopes([Auth.Scopes.userLibraryRead, Auth.Scopes.streaming])
  .setClientId(REACT_APP_CLIENT_ID as string)
  .setRedirectUri(REACT_APP_REDIRECT_URL as string)

spotifyAppContainer
  .bind<Auth.SpotifyAuthUrlProvider>(AppDependencies.Auth.UrlProvider)
  .toConstantValue(spotifyAuthUrlProvider)

spotifyAppContainer.load(buildProviderModule())
