import { RootState } from 'typesafe-actions'

export const getPlaylist = (state: RootState) => state.playlist.value

export const getFetchingStatus = (state: RootState) => state.playlist.status
