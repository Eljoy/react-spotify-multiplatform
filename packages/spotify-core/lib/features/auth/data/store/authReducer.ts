import { createReducer, getType } from "typesafe-actions";
import { signIn, signOut } from "./authActions";

type StateType = {
  isSignedIn?: boolean
}

const initialState = {
  isSignedIn: null
};

export default createReducer<StateType>(initialState, {
  [getType(signIn.success)]: (state) => ({
    ...state,
    isSignedIn: true
  }),
  [getType(signOut.success)]: (state) => ({
    ...state,
    isSignedIn: false
  })
});
