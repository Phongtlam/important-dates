import { createReducer } from '../lib/utils';
import * as types from '../actions/types';
import { UserObject } from '../interfaces';

const initialState: UserObject = {
	username: '',
	email: '',
	password: '',
	uid: ''
};

export const userObject = createReducer(initialState, {
	[types.UPDATE_LOCAL_USER_OBJECT](state: UserObject, { inputObject }) {
		return {
			...state,
			...inputObject
		};
	}
});
