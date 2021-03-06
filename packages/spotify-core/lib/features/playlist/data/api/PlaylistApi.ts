import { inject } from 'inversify'
import { provide } from 'inversify-binding-decorators'
import { ApiClientBuilder } from '../../../../api'
import { AppDependencies } from '../../../../dependencies'
import { Entities } from '../../../../entities'

@provide(AppDependencies.Playlist.Api)
export default class PlaylistApi {
  private apiClient: ApiClientBuilder.ApiClient

  constructor(
    @inject(AppDependencies.Common.ApiClientBuilder)
    apiClientBuilder: ApiClientBuilder
  ) {
    this.apiClient = apiClientBuilder
      .withRetryRequest()
      .withAuthBearerHeader()
      .build()
  }

  async fetchPlaylist(playlistId) {
    const { data: playlistDao } = await this.apiClient.get(
      `https://api.spotify.com/v1/playlists/${playlistId}`
    )
    console.log(playlistDao)
    return Entities.Playlist.deserialize(playlistDao)
  }
}
