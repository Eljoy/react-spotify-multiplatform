import { inject } from 'inversify'
import { AppDependencies } from '../../../../dependencies'
import { Entities } from '../../../../entities'
import { spotifyAppDecorators } from '../../../../inversify.config'
import { PlaylistApi } from '../api'

@spotifyAppDecorators.provideSingleton(AppDependencies.Playlist.Repository)
export default class PlaylistRepository {
  @inject(AppDependencies.Playlist.Api)
  private playlistApi: PlaylistApi

  async getPlaylist(playlistId: string): Promise<Entities.Playlist> {
    return this.playlistApi.fetchPlaylist(playlistId)
  }
}
