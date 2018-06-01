import { auth } from './firebase';

export const loginSignup = async (api: 'login' | 'signup', { email = '', password = '' }: { email: string, password: string }) => {
	if (api === 'login') {
		return await auth.signInWithEmailAndPassword(email, password);
	}
	if (api === 'signup') {
		return await auth.createUserWithEmailAndPassword(email, password);
	}
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

export const updateUserProfile = async (username: string) => {
	if (auth.currentUser) {
		return await auth.currentUser.updateProfile({
			displayName: username,
			photoURL: null
		});
	}
};
