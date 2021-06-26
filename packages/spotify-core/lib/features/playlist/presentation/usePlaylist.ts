import { playlistActions, playlistSelectors } from "../data";
import { useDispatch, useSelector } from "react-redux";

export default function usePlaylist() {
  const dispatch = useDispatch()
  return {
    fetchPlaylist: (playlistId: string) => dispatch(playlistActions.fetchPlaylist.request({ playlistId })),
    playlist: useSelector(playlistSelectors.getPlaylist),
    fetchingStatus: useSelector(playlistSelectors.getFetchingStatus)
  };
}
