import * as React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { AppText, AppButton } from '../lib/components';
import { loginSignup } from '../styles/globalStyles';

interface LoginProps {
	navigation: any;
}

class Login extends React.Component<LoginProps> {
	render() {
		return (
			<View>
				<AppText>New Account</AppText>
				<TextInput placeholder='Username' />
				<TextInput placeholder='Password' />
				<AppButton title='Register' />
				<View style={loginSignup.textContainer}>
					<AppText>Already have an account? </AppText>
					<TouchableOpacity
							onPress={() => { this.props.navigation.navigate('LoginScreen'); }}
					>
						<AppText>Log in</AppText>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default Login;