import { auth } from './firebase';

export const loginSignup = async (api: 'login' | 'signup', { email = '', password = '' }: { email: string, password: string }) => {
	let response;
	try {
		if (api === 'login') {
			response = await auth.signInAndRetrieveDataWithEmailAndPassword(email, password);
		}
		if (api === 'signup') {
			response = await auth.createUserWithEmailAndPassword(email, password);
		}
	} catch (error) {
		response = { error: error.toString() };
	}
	return response;
};

export const sendPasswordReset = async (email: string) => {
	try {
		await auth.sendPasswordResetEmail(email);
	} catch (error) {
		return { error: error.toString () };
	}
	return { success: 'Email sent successfully! Please check your email.'};
};

export const logout = async () => {
	let response;
	try {
		await auth.signOut();
		response = { success: 'You are logged out! We hope to see you again.' };
	} catch (error) {
		response = { error: error.toString () };
	}
	return response;
};