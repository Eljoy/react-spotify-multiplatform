import { call, put, takeLatest } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import { byLazy } from '../../../../common'
import { AppDependencies } from '../../../../dependencies'
import { spotifyAppContainer } from '../../../../inversify.config'
import { PlaylistRepository } from '../repository'
import { playlistActions } from '../store'

const playlistRepository = byLazy(() =>
  spotifyAppContainer.get<PlaylistRepository>(
    AppDependencies.Playlist.Repository
  )
)

export default function* playlistSaga() {
  yield takeLatest(playlistActions.fetchPlaylist.request, fetchPlaylist)
}

function* fetchPlaylist({
  payload,
}: ActionType<typeof playlistActions.fetchPlaylist.request>) {
  try {
    const playlist = yield call(
      [playlistRepository(), 'getPlaylist'],
      payload.playlistId
    )
    yield put(playlistActions.fetchPlaylist.success(playlist))
  } catch (e) {
    yield put(playlistActions.fetchPlaylist.failure(e))
  }
}
