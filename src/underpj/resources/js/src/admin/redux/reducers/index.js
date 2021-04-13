import { combineReducers } from 'redux';
import { usersReducers } from './usersReducers';

export const reducer = combineReducers({
    userLoginData: usersReducers
})
