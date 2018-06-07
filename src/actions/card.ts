import * as types from './types';
import { TypedAction } from '../interfaces';

interface ToggleCardPayload {
	isClose: boolean;
}

export type ToggleCard = (cardType: string | false) => TypedAction<types.TOGGLE_CARD_TYPE, ToggleCardPayload>;

export const toggleCard = (cardType: string | false) => ({
	type: types.TOGGLE_CARD,
	cardType,
});