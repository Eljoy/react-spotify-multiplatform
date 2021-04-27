import {  createAsyncAction } from 'typesafe-actions'
import { PlaylistPreview } from "../../../../entities";

export const fetchFeaturedPlaylists = createAsyncAction(
  '[FEATURED_PLAYLIST] FETCH_FEATURED_PLAYLISTS_REQUEST',
  '[FEATURED_PLAYLIST] FETCH_FEATURED_PLAYLISTS_SUCCESS',
  '[FEATURED_PLAYLIST] FETCH_FEATURED_PLAYLISTS_FAILURE',
)<void, PlaylistPreview[], Error>()
