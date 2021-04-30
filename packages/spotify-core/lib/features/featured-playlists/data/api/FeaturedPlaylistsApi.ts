import { inject } from 'inversify'
import { provide } from 'inversify-binding-decorators'
import { ApiClient, ApiClientBuilder } from '../../../../api'
import { AppDependencies } from '../../../../dependencies'
import { PlaylistPreview } from '../../../../entities'

@provide(AppDependencies.FeaturedPlaylist.Api)
export default class FeaturedPlaylistsApi {
  private apiClient: ApiClient

  constructor(
    @inject(AppDependencies.Common.ApiClientBuilder)
    apiClientBuilder: ApiClientBuilder
  ) {
    this.apiClient = apiClientBuilder
      .withCacheResponse()
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
