import { inject } from 'inversify'
import { AppDependencies } from '../../../../dependencies'
import { PlaylistPreview } from '../../../../entities'
import { spotifyAppDecorators } from '../../../../inversify.config'
import { FeaturedPlaylistsApi } from '../api'

@spotifyAppDecorators.provideSingleton(
  AppDependencies.FeaturedPlaylist.Repository
)
export default class FeaturedPlaylistsRepository {
  @inject(AppDependencies.FeaturedPlaylist.Api)
  private featuredPlaylistApi: FeaturedPlaylistsApi

  async getFeaturedPlaylists(): Promise<PlaylistPreview[]> {
    return this.featuredPlaylistApi.fetchFeaturedPlaylists()
  }
}
