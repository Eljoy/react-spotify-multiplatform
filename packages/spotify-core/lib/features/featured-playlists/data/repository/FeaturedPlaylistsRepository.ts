import { inject, injectable } from "inversify";
import { AppDependencies } from "../../../../dependencies";
import { Playlist } from "../../../../entities";
import { FeaturedPlaylistApi } from "../api";

@injectable()
export default class FeaturedPlaylistsRepository {
  @inject(AppDependencies.FEATURED_PLAYLIST_API)
  private featuredPlaylistApi: FeaturedPlaylistApi;

  async getFeaturedPlaylists(): Promise<Playlist[]> {
    return this.featuredPlaylistApi.fetchFeaturedPlaylists();
  }
}
