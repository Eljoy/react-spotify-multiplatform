import { Entities } from '../../entities'
import faker from 'faker'
import range from 'lodash.range'
import { generateArtist } from './generateArtist'
import { generateAlbum } from './generateAlbum'
import { multiple } from '../multiple'

export function generateTrack(): Entities.Track {
  const track = new Entities.Track()
  track.id = faker.datatype.uuid()
  track.name = faker.name.firstName()
  track.durationMs = 30
  track.artists = multiple(Math.floor(Math.random() * 2 + 1), generateArtist)
  track.previewUrl = null
  track.album = generateAlbum()
  return track
}
