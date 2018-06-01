import { database } from './firebase';
import { UserObject } from '../../interfaces';

export const createNewUser = async ({ uid, username, email }: UserObject) => {
	try {
		return await database.ref('users/' + uid).set({
			username,
			email
		});
	} catch (error) {
		return { error: error.toString() };
	}
};