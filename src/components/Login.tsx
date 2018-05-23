import * as React from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import { AppText, AppButton } from '../lib/components';
import { loginSignup } from '../styles/globalStyles';

interface LoginProps {
	navigation: any;
}

class Login extends React.Component<LoginProps> {
	render() {
		return (
			<View>
				<AppText>Log In</AppText>
				<TextInput placeholder='Password' />
				<TextInput placeholder='Confirm your password' />
				<AppButton title='Log in' />
				<View style={loginSignup.textContainer}>
					<AppText>Don't have an account? </AppText>
					<TouchableOpacity
						onPress={() => { this.props.navigation.navigate('SignupScreen'); }}
					>
						<AppText>Sign up.</AppText>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default Login;