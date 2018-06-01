import { combineReducers } from 'redux';
import * as modalReducers from './modal';
import * as userReducers from './user';

const appReducer = combineReducers({
	...modalReducers,
	...userReducers
});

export default (state, action) => {
	if (action.type === 'USER_LOGOUT') {
		state = undefined;
	}

	return appReducer(state, action);
};