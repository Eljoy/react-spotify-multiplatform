import { RootStateOrAny } from 'react-redux'
import { createReducer } from 'typesafe-actions'
import { Reducer } from 'typesafe-actions/dist/type-helpers'
import { setIsSignedIn, signIn, signOut } from './authActions'

type StateType = {
  isSignedIn?: boolean
}

const initialState = {
  isSignedIn: null,
}

const authReducer: Reducer<
  StateType,
  RootStateOrAny
> = createReducer<StateType>(initialState)
  .handleAction(signIn.success, () => ({ isSignedIn: true }))
  .handleAction(signOut.success, () => ({ isSignedIn: false }))
  .handleAction(setIsSignedIn, (_, action) => ({ isSignedIn: action.payload }))

export default authReducer
