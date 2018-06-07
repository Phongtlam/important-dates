import { combineReducers } from 'redux';
import * as modalReducers from './modal';
import * as userReducers from './user';
import * as cardReducers from './card';

const appReducer = combineReducers({
	...modalReducers,
	...userReducers,
	...cardReducers
});

export default (state, action) => {
	if (action.type === 'USER_LOGOUT') {
		state = undefined;
	}

	return appReducer(state, action);
};