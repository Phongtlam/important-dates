import { createReducer } from '../lib/utils';
import * as types from '../actions/types';

export const isLoadingScreen = createReducer(false, {
	[types.TOGGLE_LOADING](state, { isClose }) {
		return isClose ? false : !state;
	},
});

const modalInitialState = {
	isOpen: false,
	modalType: undefined,
	modalText: '',
	stayOpen: false
};

export const modalData = createReducer(modalInitialState, {
	[types.TOGGLE_APP_MODAL](state, { isOpen, modalType, modalText, stayOpen, functionToResolve }) {
		return {
			isOpen,
			modalType,
			modalText,
			stayOpen,
			functionToResolve
		};
	}
});