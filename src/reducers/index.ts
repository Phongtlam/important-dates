import { combineReducers } from 'redux';
import * as modalReducers from './modal';

const appReducer = combineReducers({
	...modalReducers
});

export default (state, action) => {
	if (action.type === 'USER_LOGOUT') {
		state = undefined;
	}

	return appReducer(state, action);
};