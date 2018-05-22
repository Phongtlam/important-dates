import { createReducer } from '../lib/utils';
import * as types from '../actions/types';

export const isLoadingScreen = createReducer(false, {
	[types.TOGGLE_LOADING](state, { isClose }) {
		return isClose ? false : !state;
	}
});