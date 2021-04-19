import { RootState } from 'typesafe-actions'

export const isSignedIn = (state: RootState) => state.auth.isSignedIn
