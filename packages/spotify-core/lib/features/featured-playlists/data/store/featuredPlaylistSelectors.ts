import { RootState } from 'typesafe-actions'

export const getFeaturedPlaylists = (state: RootState) => state.featuredPlaylists.playlists
