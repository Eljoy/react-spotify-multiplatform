import { Entities } from '../../entities'
import * as faker from 'faker'

export function generateArtist() {
  const artist = new Entities.Artist()
  artist.id = faker.datatype.uuid()
  artist.name = faker.name.firstName()
  artist.href = faker.internet.url()
  return artist
}
