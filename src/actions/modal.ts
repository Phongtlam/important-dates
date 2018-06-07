import * as types from './types';
import { TypedAction } from '../interfaces';

interface ToggleLoadingPayload {
	isClose: boolean;
}

interface ToggleAppModalPayload {
	isOpen: boolean;
	modalType: 'Info' | 'Danger';
	modalText: string;
	stayOpen: boolean;
}

export type ToggleLoading = (isClose?: boolean) => TypedAction<types.TOGGLE_LOADING_TYPE, ToggleLoadingPayload>;

export const toggleLoading = (isClose?: boolean) => (dispatch) => {
	dispatch({
		type: types.TOGGLE_LOADING,
		isClose
	});
};

export type ToggleAppModal = (isOpen: boolean, modalType: string, modalText: string, stayOpen?: boolean, functionToResolve?: Function) =>
	TypedAction<types.TOGGLE_APP_MODAL_TYPE, ToggleAppModalPayload>;

export const toggleAppModal = (
	isOpen: boolean = false, modalType: string = 'Info', modalText: string = '', stayOpen?: boolean, functionToResolve?: Function
) => {
	return {
		type: types.TOGGLE_APP_MODAL,
		isOpen,
		modalType,
		modalText,
		stayOpen,
		functionToResolve
	};
};