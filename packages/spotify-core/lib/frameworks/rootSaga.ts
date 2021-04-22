import { all } from "redux-saga/effects";
import { Auth, UserFeature, FeaturedPlaylistsFeature } from "../features";

export default function* rootSaga() {
  yield all([
    Auth.authSaga(),
    UserFeature.currentUserSaga(),
    FeaturedPlaylistsFeature.featuredPlaylistsSaga()
  ]);
}
