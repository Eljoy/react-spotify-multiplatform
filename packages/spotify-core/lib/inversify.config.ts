import { Container } from 'inversify'
import getDecorators from 'inversify-inject-decorators'

const spotifyAppContainer = new Container({ skipBaseClassChecks: true })

const spotifyAppDecorators = getDecorators(spotifyAppContainer, false)

export { spotifyAppContainer, spotifyAppDecorators }
