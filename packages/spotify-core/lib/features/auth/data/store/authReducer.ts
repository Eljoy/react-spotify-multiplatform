import { createReducer, getType} from 'typesafe-actions'
import {setUser, signIn, signOut} from './authActions'
import {User} from '../../../../entities'

type StateType = {
    isSignedIn?: boolean
    user?: User
}

const initialState = {
    isSignedIn: null,
    user: null,
}

export default createReducer<StateType>(initialState, {
  [getType(signIn.success)]: (state, action: ReturnType<typeof signIn.success>) => ({
    ...state,
    isSignedIn: true,
  }),
  [getType(signOut.success)]: (state) => ({
    ...state,
    user: null,
    isSignedIn: false,
  }),
  [getType(setUser)]: (state, action: ReturnType<typeof setUser>) => ({
    ...state,
    user: action.payload,
    isSignedIn: !!action.payload,
  }),
})
