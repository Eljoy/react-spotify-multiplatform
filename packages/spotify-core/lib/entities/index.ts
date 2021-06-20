import { Album as AlbumEntity } from './album'
import { Artist as ArtistEntity } from './artist'
import { Image as ImageEntity } from './image'
import { Playlist as PlaylistEntity } from './playlist'
import { PlaylistPreview as PlaylistPreviewEntity } from './playlist-preview'
import { RequestCode as RequestCodeEntity } from './request-code'
import { Token as TokenEntity } from './token'
import { Track as TrackEntity } from './track'
import { User as UserEntity } from './user'

export const Entities = {
  Album: AlbumEntity,
  Artist: ArtistEntity,
  Image: ImageEntity,
  Playlist: PlaylistEntity,
  PlaylistPreview: PlaylistPreviewEntity,
  Track: TrackEntity,
  Token: TokenEntity,
  RequestCode: RequestCodeEntity,
  User: UserEntity,
}

export namespace Entities {
  export type Album = InstanceType<typeof AlbumEntity>
  export type Artist = InstanceType<typeof ArtistEntity>
  export type Image = InstanceType<typeof ImageEntity>
  export type Playlist = InstanceType<typeof PlaylistEntity>
  export type PlaylistPreview = InstanceType<typeof PlaylistEntity>
  export type Track = InstanceType<typeof TrackEntity>
  export type Token = InstanceType<typeof TokenEntity>
  export type User = InstanceType<typeof UserEntity>
  export type RequestCode = InstanceType<typeof RequestCodeEntity>
}
