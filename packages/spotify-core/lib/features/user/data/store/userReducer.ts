import { createReducer } from "typesafe-actions";
import { fetchCurrentUser } from "./userActions";
import { User } from "../../entities";
import { Reducer } from "typesafe-actions/dist/type-helpers";
import { combineReducers } from "redux";
import { RootStateOrAny } from "react-redux";

const initialState = {
  currentUser: null
};

const currentUser: Reducer<User, RootStateOrAny> = createReducer(initialState.currentUser)
  .handleAction(fetchCurrentUser.success, (_, action) => action.payload);

export default combineReducers({
  currentUser: currentUser
})
