import { call, put, takeLatest } from 'redux-saga/effects'
import { byLazy } from '../../../../common'
import { AppDependencies } from '../../../../dependencies'
import { spotifyAppContainer } from '../../../../inversify.config'
import { signIn, signOut } from '../../../auth'
import { CurrentUserRepository } from '../repository'
import { userActions } from '../store'

const currentUserRepository = byLazy(() =>
  spotifyAppContainer.get<CurrentUserRepository>(
    AppDependencies.User.CurrentUserRepository
  )
)

export default function* currentUserSaga() {
  yield takeLatest(signIn.success, getCurrentUser)
  yield takeLatest(signOut.success, removeCurrentUser)
}

function* getCurrentUser() {
  try {
    const currentUser = yield call([currentUserRepository(), 'getCurrentUser'])
    yield put(userActions.fetchCurrentUser.success(currentUser))
  } catch (e) {
    yield put(userActions.fetchCurrentUser.failure(e))
  }
}

function* removeCurrentUser() {
  yield put(userActions.fetchCurrentUser.success(null))
  yield call([currentUserRepository(), 'removeCurrentUser'])
}
