import { inject, injectable } from "inversify";
import { AppDependencies } from "../../../../dependencies";
import { Playlist } from "../../../../entities";
import { PlaylistApi } from "../api";

@injectable()
export default class PlaylistRepository {
  @inject(AppDependencies.PLAYLIST_API)
  private playlistApi: PlaylistApi;

  async getPlaylist(playlistId: string): Promise<Playlist> {
    return this.playlistApi.fetchPlaylist(playlistId)
  }
}
