import { call, put, takeLatest } from "redux-saga/effects";
import { byLazy } from "../../../../common";
import { spotifyAppContainer } from "../../../../inversify.config";
import { AppDependencies } from "../../../../dependencies";
import { FeaturedPlaylistsRepository } from "../repository";
import { featuredPlaylistActions } from "../store";

const featuredPlaylistsRepository = byLazy(() => spotifyAppContainer
  .get<FeaturedPlaylistsRepository>(AppDependencies.FEATURED_PLAYLISTS_REPOSITORY));

export default function* featuredPlaylistsSaga() {
  yield takeLatest(featuredPlaylistActions.fetchFeaturedPlaylists.request, fetchFeaturedPlaylists);
}

function* fetchFeaturedPlaylists() {
  try {
    const featuredPlaylists = yield call([featuredPlaylistsRepository(), "getFeaturedPlaylists"]);
    yield put(featuredPlaylistActions.fetchFeaturedPlaylists.success(featuredPlaylists));
  } catch (e) {
    yield put(featuredPlaylistActions.fetchFeaturedPlaylists.failure(e));
  }
}
