import { combineReducers } from 'redux';
import authentication from './reducers/authenticationReducer';
import users from './reducers/usersReducer';

export default combineReducers({ authentication, users });
