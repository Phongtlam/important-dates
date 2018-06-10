import { database } from './firebase';
import shortid from 'shortid';
import { UserObject, DateObject } from '../../interfaces';

export const createNewUser = ({ uid, username, email }: UserObject) => {
	return database.ref('users/' + uid).set({
		username,
		email
	});
};

export const addNewDate = (uid, { type, date, description, picture }: DateObject) => {
	return database.ref(`users/${uid}/dates/${type}/${shortid.generate()}`).set({
		date,
		description,
		picture
	});
};