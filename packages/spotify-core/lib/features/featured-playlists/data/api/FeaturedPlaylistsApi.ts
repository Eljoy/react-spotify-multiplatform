import { inject } from 'inversify'
import { provide } from 'inversify-binding-decorators'
import { ApiClient, ApiClientBuilder } from '../../../../api'
import { AppDependencies } from '../../../../dependencies'
import { Entities } from '../../../../entities'

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
      .withAuthBearerHeader()
      .build()
  }

  async fetchFeaturedPlaylists(): Promise<Entities.PlaylistPreview[]> {
    const { data } = await this.apiClient.get(
      'https://api.spotify.com/v1/browse/featured-playlists'
    )
    return data.playlists.items.map((featuredPlaylistDao) =>
      Entities.PlaylistPreview.deserialize(featuredPlaylistDao)
    )
  }
}
