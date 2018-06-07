import * as modalActions from './modal';
import * as userActions from './user';
import * as cardActions from './card';

export const ActionCreators = {
	...modalActions,
	...userActions,
	...cardActions
};