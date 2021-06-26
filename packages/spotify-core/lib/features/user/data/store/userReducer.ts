import { RootStateOrAny } from 'react-redux'
import { combineReducers } from 'redux'
import { createReducer } from 'typesafe-actions'
import { Reducer } from 'typesafe-actions/dist/type-helpers'
import { Entities } from '../../../../entities'
import { fetchCurrentUser } from './userActions'

const initialState = {
  currentUser: null,
}

const currentUser: Reducer<Entities.User, RootStateOrAny> = createReducer(
  initialState.currentUser
).handleAction(fetchCurrentUser.success, (_, action) => action.payload)

export default combineReducers({
  currentUser: currentUser,
})
