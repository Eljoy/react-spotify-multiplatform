import { RootStateOrAny } from 'react-redux'
import { combineReducers } from 'redux'
import { createReducer } from 'typesafe-actions'
import { Reducer } from 'typesafe-actions/dist/type-helpers'
import { Entities } from '../../../../entities'
import { fetchFeaturedPlaylists } from './featuredPlaylistActions'

const initialState = {
  playlists: [],
}

const playlists: Reducer<
  Entities.PlaylistPreview[],
  RootStateOrAny
> = createReducer(initialState.playlists).handleAction(
  fetchFeaturedPlaylists.success,
  (_, action) => action.payload
)

export default combineReducers({
  playlists: playlists,
})
