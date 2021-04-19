import { createAction, createAsyncAction } from 'typesafe-actions'
import { User } from '../../../../entities'
import { Token } from '../../entities'

export const signIn = createAsyncAction(
  '[AUTH] SIGN_IN_REQUEST',
  '[AUTH] SIGN_IN_SUCCESS',
  '[AUTH] SIGN_IN_FAILURE',
)<{ authUrl: string }, Token, Error>()

export const signOut = createAsyncAction(
  '[AUTH] SIGN_OUT_REQUEST',
  '[AUTH] SIGN_OUT_SUCCESS',
  '[AUTH] SIGN_OUT_FAILURE',
)<void, void, Error>()

export const setUser = createAction('[AUTH] SET_USER')<User>()
