import {  createAsyncAction } from 'typesafe-actions'
import { User } from "../../entities";

export const fetchCurrentUser = createAsyncAction(
  '[USER] FETCH_CURRENT_USER_REQUEST',
  '[USER] FETCH_CURRENT_USER_SUCCESS',
  '[USER] FETCH_CURRENT_USER_FAILURE',
)<void, User, Error>()
