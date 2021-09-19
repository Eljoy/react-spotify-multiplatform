import * as faker from 'faker'
import { Entities } from '../../entities'

export function generateImage(
  width = null,
  height = null,
  category = 'technics',
  randomize = true
): Entities.Image {
  const image = new Entities.Image()
  image.url = faker.image
    .imageUrl(width, height, category, randomize)
    .replace('http', 'https')
  return image
}

export function generateAvatar(): Entities.Image {
  const image = new Entities.Image()
  image.url = faker.image.avatar()
  return image
}
