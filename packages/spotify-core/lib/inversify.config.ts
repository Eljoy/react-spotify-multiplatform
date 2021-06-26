import { Container } from 'inversify'
import { fluentProvide } from 'inversify-binding-decorators'
import getDecorators from 'inversify-inject-decorators'

const spotifyAppContainer = new Container({ skipBaseClassChecks: true })

const provideSingleton = function (serviceIdentifier) {
  return fluentProvide(serviceIdentifier).inSingletonScope().done()
}

const spotifyAppDecorators = {
  ...getDecorators(spotifyAppContainer, false),
  provideSingleton,
}

export { spotifyAppContainer, spotifyAppDecorators }
