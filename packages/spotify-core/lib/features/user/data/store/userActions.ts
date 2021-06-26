import { createAsyncAction } from 'typesafe-actions'
import { Entities } from '../../../../entities'

export const fetchCurrentUser = createAsyncAction(
  '[USER] FETCH_CURRENT_USER_REQUEST',
  '[USER] FETCH_CURRENT_USER_SUCCESS',
  '[USER] FETCH_CURRENT_USER_FAILURE'
)<void, Entities.User, Error>()
