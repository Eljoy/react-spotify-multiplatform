import { createAction, createAsyncAction } from 'typesafe-actions'
import { Entities } from '../../../../entities'

export const signIn = createAsyncAction(
  '[AUTH] SIGN_IN_REQUEST',
  '[AUTH] SIGN_IN_SUCCESS',
  '[AUTH] SIGN_IN_FAILURE'
)<void, Entities.Token, Error>()

export const signOut = createAsyncAction(
  '[AUTH] SIGN_OUT_REQUEST',
  '[AUTH] SIGN_OUT_SUCCESS',
  '[AUTH] SIGN_OUT_FAILURE'
)<void, void, Error>()

export const setIsSignedIn = createAction('[AUTH] SET_IS_SIGNED_IN')<boolean>()
