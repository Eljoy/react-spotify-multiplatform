import { all } from 'redux-saga/effects'
import { Auth } from '../features'

export default function* rootSaga() {
  yield all([Auth.authSaga()])
}
