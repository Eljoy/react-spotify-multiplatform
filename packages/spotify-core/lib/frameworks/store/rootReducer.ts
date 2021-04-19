import { combineReducers } from 'redux';
import { Auth } from '../../features'

export default combineReducers({
  auth: Auth.authReducer
});
