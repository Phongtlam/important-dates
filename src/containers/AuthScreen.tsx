import * as React from 'react';
import { View, TextInput, Button } from 'react-native';
import AppText from '../lib/components/AppText';
import AppBackgroundWrapper from '../lib/components/AppBackgroundWrapper';
import AppButton from '../lib/components/AppButton';

interface AuthScreenProps {

}

class AuthScreen extends React.Component<AuthScreenProps> {
	render() {
		return (
			<View>
				<AppText>Hello</AppText>
				<TextInput placeholder='email' />
				<TextInput placeholder='password' />
				<AppButton title='LOG IN' />
			</View>
		);
	}
}

export default AuthScreen;