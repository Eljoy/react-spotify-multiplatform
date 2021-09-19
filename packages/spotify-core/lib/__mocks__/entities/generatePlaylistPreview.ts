import faker from 'faker'
import { Entities } from '../../entities'

export function generatePlaylistPreview(): Entities.PlaylistPreview {
  const playlistPreview = new Entities.PlaylistPreview()
  playlistPreview.id = faker.datatype.uuid()
  playlistPreview.href = faker.internet.url()
  playlistPreview.name = faker.lorem.words()
  playlistPreview.description = faker.lorem.paragraph()
  playlistPreview.backgroundImage = generatePlaylistImage()
  return playlistPreview
}

const playlistImages = [
  'https://m.media-amazon.com/images/I/61d8t0gNa+L._SS500_.jpg',
  'https://www.udiscovermusic.com/wp-content/uploads/2015/10/Janelle-Mona%CC%81e-Dirty-Computer-.jpg',
  'https://i.pinimg.com/originals/8d/e4/20/8de42050e671b93b1d6bad2f2764ba89.jpg',
  'https://i.pinimg.com/originals/44/86/16/4486167e8fec4d4438a12707da02537f.jpg',
]

export const generatePlaylistImage = createImageGenerator(playlistImages)

export const createPlaylistImageGenerator = () => createImageGenerator(playlistImages)

export const createAlbumImageGenerator = () => createImageGenerator(playlistImages)

function createImageGenerator(imageUrls: string[]) {
  let i = 0
  return () => {
    const image = new Entities.Image()
    image.url = playlistImages[i]
    i = (i + 1) % imageUrls.length
    return image
  }
}

