import { RootStateOrAny } from 'react-redux'
import { combineReducers } from 'redux'
import { createReducer } from 'typesafe-actions'
import { Reducer } from 'typesafe-actions/dist/type-helpers'
import { createFetchingStatusReducer } from '../../../../common'
import { Entities } from '../../../../entities'
import { fetchPlaylist } from './playlistActions'

const initialState = {
  status: null,
  value: null,
}

const value: Reducer<Entities.Playlist, RootStateOrAny> = createReducer(
  initialState.value
).handleAction(fetchPlaylist.success, (_, action) => action.payload)

const status = createFetchingStatusReducer(fetchPlaylist, initialState.status)

export default combineReducers({
  status,
  value,
})
