import { combineReducers } from 'redux';
import { Auth, UserFeature, FeaturedPlaylistsFeature, PlaylistFeature } from '../../features'

export default combineReducers({
  auth: Auth.authReducer,
  user: UserFeature.userReducer,
  featuredPlaylists: FeaturedPlaylistsFeature.featuredPlaylistReducer,
  playlist: PlaylistFeature.playlistReducer
});
