import { RootState } from 'typesafe-actions'

export const getCurrentUser = (state: RootState) => state.user.currentUser
