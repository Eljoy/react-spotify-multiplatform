import { createAsyncAction } from 'typesafe-actions'
import { Entities } from '../../../../entities'

export const fetchPlaylist = createAsyncAction(
  '[PLAYLIST] FETCH_PLAYLISTS_REQUEST',
  '[PLAYLIST] FETCH_PLAYLISTS_SUCCESS',
  '[PLAYLIST] FETCH_PLAYLISTS_FAILURE'
)<{ playlistId: string }, typeof Entities.Playlist, Error>()
