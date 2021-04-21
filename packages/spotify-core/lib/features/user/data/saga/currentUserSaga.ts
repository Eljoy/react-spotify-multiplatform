import { put, call, takeLatest } from "redux-saga/effects";
import { byLazy } from "../../../../common";
import { spotifyAppContainer } from "../../../../inversify.config";
import { CurrentUserRepository } from "../repository";
import { AppDependencies } from "../../../../dependencies";
import { userActions } from "../store";
import { signIn, signOut } from "../../../auth";

const currentUserRepository = byLazy(() => spotifyAppContainer.get<CurrentUserRepository>(AppDependencies.CURRENT_USER_REPOSITORY));

export default function* currentUserSaga() {
  yield takeLatest(signIn.success, getCurrentUser)
  yield takeLatest(signOut.success, removeCurrentUser)
}

function* getCurrentUser() {
  try {
    const currentUser = yield call([currentUserRepository(), 'getCurrentUser']);
    yield put(userActions.fetchCurrentUser.success(currentUser));
  } catch (e) {
    yield put(userActions.fetchCurrentUser.failure(e));
  }
}

function* removeCurrentUser() {
  yield put(userActions.fetchCurrentUser.success(null))
  yield call([currentUserRepository(), 'removeCurrentUser']);
}
