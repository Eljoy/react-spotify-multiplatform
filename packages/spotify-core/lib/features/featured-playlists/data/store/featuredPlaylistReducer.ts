import { Reducer } from "typesafe-actions/dist/type-helpers";
import { PlaylistPreview } from "../../../../entities";
import { RootStateOrAny } from "react-redux";
import { createReducer } from "typesafe-actions";
import { combineReducers } from "redux";
import { fetchFeaturedPlaylists } from "./featuredPlaylistActions";

const initialState = {
  playlists: []
};

const playlists: Reducer<PlaylistPreview[], RootStateOrAny> = createReducer(initialState.playlists)
  .handleAction(fetchFeaturedPlaylists.success, (_, action) => action.payload);

export default combineReducers({
  playlists: playlists
})
