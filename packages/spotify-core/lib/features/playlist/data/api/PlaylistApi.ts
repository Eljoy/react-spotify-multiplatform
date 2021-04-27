import { inject, injectable } from "inversify";
import { AppDependencies } from "../../../../dependencies";
import { ApiClient, ApiClientBuilder } from "../../../../api";
import { Playlist } from "../../../../entities";

@injectable()
export default class PlaylistApi {
  private apiClient: ApiClient;

  constructor(@inject(AppDependencies.API_CLIENT_BUILDER) apiClientBuilder: ApiClientBuilder) {
    this.apiClient = apiClientBuilder
      .withRetryRequest()
      .withAuthHeader()
      .build();
  }

  async fetchPlaylist(playlistId) {
    const { data: playlistDao } = await this.apiClient.get(`https://api.spotify.com/v1/playlists/${playlistId}`);
    return  Playlist.deserialize(playlistDao);
  }
}
