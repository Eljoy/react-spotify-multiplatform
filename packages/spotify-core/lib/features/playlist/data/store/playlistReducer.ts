import { Reducer } from "typesafe-actions/dist/type-helpers";
import { Playlist } from "../../../../entities";
import { RootStateOrAny } from "react-redux";
import { createReducer } from "typesafe-actions";
import { combineReducers } from "redux";
import { fetchPlaylist } from "./playlistActions";
import { createFetchingStatusReducer } from "../../../../common";

const initialState = {
  status: null,
  value: null
};

const value: Reducer<Playlist, RootStateOrAny> = createReducer(initialState.value)
  .handleAction(fetchPlaylist.success, (_, action) => action.payload);

const status = createFetchingStatusReducer(fetchPlaylist, initialState.status)

export default combineReducers({
  status,
  value
})
