import { inject } from 'inversify'
import { AppDependencies } from '../../../../dependencies'
import { Playlist } from '../../../../entities'
import { PlaylistApi } from '../api'
import { provide } from 'inversify-binding-decorators'

@provide(AppDependencies.PLAYLIST_REPOSITORY)
export default class PlaylistRepository {
  @inject(AppDependencies.PLAYLIST_API)
  private playlistApi: PlaylistApi

  async getPlaylist(playlistId: string): Promise<Playlist> {
    return this.playlistApi.fetchPlaylist(playlistId)
  }
}
