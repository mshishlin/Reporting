import { combineReducers } from 'redux';
import authentication from './reducers/authenticationReducer';
import quarters from './reducers/quartersReducer';
import reports from './reducers/reportsReducer';
import users from './reducers/usersReducer';

export default combineReducers({ authentication, quarters, reports, users });
