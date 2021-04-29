import { inject } from 'inversify'
import { AppDependencies } from '../../../../dependencies'
import { Playlist } from '../../../../entities'
import { spotifyAppDecorators } from '../../../../inversify.config'
import { PlaylistApi } from '../api'

@spotifyAppDecorators.provideSingleton(AppDependencies.PLAYLIST_REPOSITORY)
export default class PlaylistRepository {
  @inject(AppDependencies.PLAYLIST_API)
  private playlistApi: PlaylistApi

  async getPlaylist(playlistId: string): Promise<Playlist> {
    return this.playlistApi.fetchPlaylist(playlistId)
  }
}
