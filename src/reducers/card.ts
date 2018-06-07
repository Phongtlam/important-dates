import { createReducer } from '../lib/utils';
import * as types from '../actions/types';

const initialState = {
	cardType: 'anniversaries',
	isOpen: false
};

export const cardState = createReducer(initialState, {
	[types.TOGGLE_CARD](state, { cardType }) {
		return {
			cardType,
			isOpen: typeof cardType === 'string' ? true : false
		};
	},
});