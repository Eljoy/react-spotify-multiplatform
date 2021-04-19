import { AppDependencies } from '../../../dependencies'
import { put, call, takeLatest, take, all, fork } from 'redux-saga/effects'
import { signIn } from '../data'
import { buffers, eventChannel } from 'redux-saga'
import { Token } from '../entities'
import { AuthRepository } from '../domain'
import { byLazy } from '../../../helpers'
import { spotifyAppContainer } from '../../../inversify.config'

const authRepository = byLazy(() => spotifyAppContainer.get<AuthRepository>(AppDependencies.SPOTIFY_AUTH_REPOSITORY))

export default function* authSaga() {
  const token = yield call(authRepository().getAuthToken)
  if (token) {
    yield put(signIn.success(token))
  }
  yield all([takeLatest(signIn.request, promptOauthSignInFlow), fork(watchAuthChange)])
}

function* promptOauthSignInFlow() {
  yield call(authRepository().promptOauthSignInFlow)
}

function* watchAuthChange() {
  const channel = eventChannel(emitter => {
    const subscriber = (token: Token) => {
      emitter(token)
    }
    authRepository().subscribe(subscriber)
    return () => {
      authRepository().unsubscribe(subscriber)
    }
  }, buffers.sliding(1))
  while (true) {
    const token: Token = yield take(channel)
    yield put(signIn.success(token))
  }
}