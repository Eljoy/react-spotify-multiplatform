import { inject, injectable } from "inversify";
import { AppDependencies } from "../../../../dependencies";
import { PlaylistPreview } from "../../../../entities";
import { FeaturedPlaylistsApi } from "../api";

@injectable()
export default class FeaturedPlaylistsRepository {
  @inject(AppDependencies.FEATURED_PLAYLIST_API)
  private featuredPlaylistApi: FeaturedPlaylistsApi;

  async getFeaturedPlaylists(): Promise<PlaylistPreview[]> {
    return this.featuredPlaylistApi.fetchFeaturedPlaylists();
  }
}
