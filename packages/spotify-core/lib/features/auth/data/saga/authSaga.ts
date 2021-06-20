import { buffers, eventChannel } from 'redux-saga'
import { all, call, fork, put, take, takeLatest } from 'redux-saga/effects'
import { byLazy } from '../../../../common'
import { AppDependencies } from '../../../../dependencies'
import { spotifyAppContainer } from '../../../../inversify.config'
import { AuthRepository } from '../../domain'
import { setIsSignedIn, signIn, signOut } from '../store'

const authRepository = byLazy(() =>
  spotifyAppContainer.get<AuthRepository>(AppDependencies.Auth.Repository)
)

export default function* authSaga() {
  const token = yield call([authRepository(), 'getAuthToken'])
  yield put(setIsSignedIn(Boolean(token)))
  yield all([
    takeLatest(signIn.request, promptOauthSignInFlow),
    takeLatest(signOut.request, signOutSaga),
    fork(watchAuthChange),
  ])
}

function* promptOauthSignInFlow() {
  try {
    yield call([authRepository(), 'signIn'])
  } catch (e) {
    yield put(signIn.failure(e))
  }
}

function* signOutSaga() {
  try {
    yield call([authRepository(), 'signOut'])
  } catch (e) {
    yield put(signOut.failure(e))
  }
}

function* watchAuthChange() {
  const channel = eventChannel((emitter) => {
    const subscriber = (authEvent: AuthRepository.Events) => {
      emitter(authEvent)
    }
    authRepository().subscribe(subscriber)
    return () => {
      authRepository().unsubscribe(subscriber)
    }
  }, buffers.sliding(1))

  while (true) {
    const authEvent: AuthRepository.Events = yield take(channel)
    switch (authEvent.name) {
      case AuthRepository.EventNames.SignedIn:
        yield put(signIn.success(authEvent.value))
        break
      case AuthRepository.EventNames.SignedOut:
        yield put(signOut.success())
        break
    }
  }
}
