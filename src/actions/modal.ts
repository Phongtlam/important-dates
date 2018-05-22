import * as types from './types';

export const toggleLoading = (isClose?: boolean) => (dispatch) => {
	dispatch({
		type: types.TOGGLE_LOADING,
		isClose
	});
};