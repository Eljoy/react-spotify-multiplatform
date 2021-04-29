import { inject } from 'inversify'
import { provide } from 'inversify-binding-decorators'
import { ApiClient, ApiClientBuilder } from '../../../../api'
import { AppDependencies } from '../../../../dependencies'
import { Playlist } from '../../../../entities'

@provide(AppDependencies.Playlist.Api)
export default class PlaylistApi {
  private apiClient: ApiClient

  constructor(
    @inject(AppDependencies.Common.ApiClientBuilder)
    apiClientBuilder: ApiClientBuilder
  ) {
    this.apiClient = apiClientBuilder
      .withRetryRequest()
      .withAuthHeader()
      .build()
  }

  async fetchPlaylist(playlistId) {
    const { data: playlistDao } = await this.apiClient.get(
      `https://api.spotify.com/v1/playlists/${playlistId}`
    )
    return Playlist.deserialize(playlistDao)
  }
}
