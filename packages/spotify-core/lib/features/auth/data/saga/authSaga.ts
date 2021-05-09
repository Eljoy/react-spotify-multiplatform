import { buffers, eventChannel } from 'redux-saga'
import { all, call, fork, put, take, takeLatest } from 'redux-saga/effects'
import { byLazy } from '../../../../common'
import { AppDependencies } from '../../../../dependencies'
import { Entities } from '../../../../entities'
import { spotifyAppContainer } from '../../../../inversify.config'
import { AuthRepository } from '../../domain'
import { signIn, signOut } from '../index'

const authRepository = byLazy(() =>
  spotifyAppContainer.get<AuthRepository>(AppDependencies.Auth.Repository)
)

export default function* authSaga() {
  const token = yield call(authRepository().getAuthToken)
  if (token) {
    yield put(signIn.success(token))
  }
  yield all([
    takeLatest(signIn.request, promptOauthSignInFlow),
    takeLatest(signOut.request, signOutSaga),
    fork(watchAuthChange),
  ])
}

function* promptOauthSignInFlow() {
  yield call(authRepository().promptOauthSignInFlow)
}

function* signOutSaga() {
  yield call([authRepository(), 'signOut'])
  yield put(signOut.success())
}

function* watchAuthChange() {
  const channel = eventChannel((emitter) => {
    const subscriber = (token: Entities.Token) => {
      emitter({ token })
    }
    authRepository().subscribe(subscriber)
    return () => {
      authRepository().unsubscribe(subscriber)
    }
  }, buffers.sliding(1))
  while (true) {
    const { token } = yield take(channel)
    if (token) {
      yield put(signIn.success(token))
    }
  }
}
