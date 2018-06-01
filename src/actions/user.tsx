import * as types from './types';
import { TypedAction } from '../interfaces';

export interface UserObjectPayload {
	inputObject: {};
}
export type UpdateLocalUserObject = (inputObject) => TypedAction<types.UPDATE_LOCAL_USER_OBJECT_TYPE, UserObjectPayload>;

export const updateLocalUserObject = (inputObject) => ({
	type: types.UPDATE_LOCAL_USER_OBJECT,
	inputObject
});