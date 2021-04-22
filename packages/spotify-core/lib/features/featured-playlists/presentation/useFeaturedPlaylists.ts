import { useDispatch, useSelector } from "react-redux";
import { featuredPlaylistSelectors, featuredPlaylistActions } from "../data";

export function useFeaturedPlaylists() {
  const dispatch = useDispatch()
  return {
    featuredPlaylists: useSelector(featuredPlaylistSelectors.getFeaturedPlaylists),
    fetchFeaturedPlaylists: () => dispatch(featuredPlaylistActions.fetchFeaturedPlaylists.request())
  };
}
