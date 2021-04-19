import { Container } from 'inversify'
import { Auth } from './features'
import { AppDependencies } from './dependencies'

const spotifyAppContainer = new Container({ skipBaseClassChecks: true })

spotifyAppContainer
  .bind<Auth.AuthRepository>(AppDependencies.SPOTIFY_AUTH_REPOSITORY)
  .to(Auth.SpotifyAuthRepository)
  .inSingletonScope()

export { spotifyAppContainer }
