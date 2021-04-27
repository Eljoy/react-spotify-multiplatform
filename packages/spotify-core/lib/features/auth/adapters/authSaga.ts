import { AppDependencies } from "../../../dependencies";
import { put, call, takeLatest, take, all, fork } from "redux-saga/effects";
import { signIn, signOut } from "../data";
import { buffers, eventChannel } from "redux-saga";
import { Token } from "../entities";
import { AuthRepository } from "../domain";
import { byLazy } from "../../../common";
import { spotifyAppContainer } from "../../../inversify.config";

const authRepository = byLazy(() => spotifyAppContainer.get<AuthRepository>(AppDependencies.SPOTIFY_AUTH_REPOSITORY));

export default function* authSaga() {
  const token = yield call(authRepository().getAuthToken);
  if (token) {
    yield put(signIn.success(token));
  }
  yield all([
    takeLatest(signIn.request, promptOauthSignInFlow),
    takeLatest(signOut.request, signOutSaga),
    fork(watchAuthChange)
  ]);
}

function* promptOauthSignInFlow() {
  yield call(authRepository().promptOauthSignInFlow);
}

function* signOutSaga() {
  yield call([authRepository(), "signOut"]);
  yield put(signOut.success());
}

function* watchAuthChange() {
  const channel = eventChannel(emitter => {
    const subscriber = (token: Token) => {
      emitter({ token });
    };
    authRepository().subscribe(subscriber);
    return () => {
      authRepository().unsubscribe(subscriber);
    };
  }, buffers.sliding(1));
  while (true) {
    const { token } = yield take(channel);
    if (token) {
      yield put(signIn.success(token));
    }
  }
}
