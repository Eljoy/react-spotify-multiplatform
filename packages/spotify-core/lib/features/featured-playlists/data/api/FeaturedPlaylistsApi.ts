import { inject } from 'inversify'
import { AppDependencies } from '../../../../dependencies'
import { ApiClient, ApiClientBuilder } from '../../../../api'
import { PlaylistPreview } from '../../../../entities'
import { provide } from 'inversify-binding-decorators'

@provide(AppDependencies.FEATURED_PLAYLIST_API)
export default class FeaturedPlaylistsApi {
  private apiClient: ApiClient

  constructor(
    @inject(AppDependencies.API_CLIENT_BUILDER)
    apiClientBuilder: ApiClientBuilder
  ) {
    this.apiClient = apiClientBuilder
      .withRetryRequest()
      .withAuthHeader()
      .build()
  }

  async fetchFeaturedPlaylists(): Promise<PlaylistPreview[]> {
    const { data } = await this.apiClient.get(
      'https://api.spotify.com/v1/browse/featured-playlists'
    )
    return data.playlists.items.map((featuredPlaylistDao) =>
      PlaylistPreview.deserialize(featuredPlaylistDao)
    )
  }
}
