import { Entities } from '../../entities'
import * as faker from 'faker'
import { generateImage } from './generateImage'
import { generateArtist } from './generateArtist'

export function generateAlbum() {
  const album = new Entities.Album()
  album.id = faker.datatype.uuid()
  album.backgroundImage = generateImage()
  album.thumbnail = generateImage()
  album.href = faker.internet.url()
  album.artists = [generateArtist()]
  album.releaseDate = faker.date.past().toDateString()
  album.name = faker.name.middleName()
  return album
}
