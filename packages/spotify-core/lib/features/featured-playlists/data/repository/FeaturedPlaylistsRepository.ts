import { inject } from 'inversify'
import { AppDependencies } from '../../../../dependencies'
import { Entities } from '../../../../entities'
import { spotifyAppDecorators } from '../../../../inversify.config'
import { FeaturedPlaylistsApi } from '../api'

@spotifyAppDecorators.provideSingleton(
  AppDependencies.FeaturedPlaylist.Repository
)
export default class FeaturedPlaylistsRepository {
  @inject(AppDependencies.FeaturedPlaylist.Api)
  private featuredPlaylistApi: FeaturedPlaylistsApi

  async getFeaturedPlaylists(): Promise<Entities.PlaylistPreview[]> {
    return this.featuredPlaylistApi.fetchFeaturedPlaylists()
  }
}
