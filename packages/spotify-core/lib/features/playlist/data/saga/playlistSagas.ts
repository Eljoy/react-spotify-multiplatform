import { call, put, takeLatest } from "redux-saga/effects";
import { byLazy } from "../../../../common";
import { spotifyAppContainer } from "../../../../inversify.config";
import { PlaylistRepository } from "../repository";
import { AppDependencies } from "../../../../dependencies";
import { playlistActions } from "../store";
import { ActionType } from "typesafe-actions";

const playlistRepository = byLazy(() => spotifyAppContainer
  .get<PlaylistRepository>(AppDependencies.PLAYLIST_REPOSITORY));

export default function* playlistSaga() {
  yield takeLatest(playlistActions.fetchPlaylist.request, fetchPlaylist);
}

function* fetchPlaylist({ payload }: ActionType<typeof playlistActions.fetchPlaylist.request>) {
  try {
    const playlist = yield call([playlistRepository(), "getPlaylist"], payload.playlistId);
    yield put(playlistActions.fetchPlaylist.success(playlist));
  } catch (e) {
    yield put(playlistActions.fetchPlaylist.failure(e));
  }
}
