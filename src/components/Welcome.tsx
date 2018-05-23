import * as React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import AppText from '../lib/components/AppText';
import AppBackgroundWrapper from '../lib/components/AppBackgroundWrapper';
import AppButton from '../lib/components/AppButton';
import { Colors } from '../styles/colors';

interface WelcomeProps {
	navigation: any;
}

const styles = StyleSheet.create({
	textContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
});

class Welcome extends React.Component<WelcomeProps> {
	render() {
		return (
			<View>
				<AppText>Start your adventure</AppText>
				<AppButton title='Log in' onPress={() => {this.props.navigation.navigate('LoginScreen'); }} />
				<View style={styles.textContainer}>
					<TouchableOpacity
						onPress={() => { console.log('reset'); }}
					>
						<AppText>Reset password</AppText>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => { this.props.navigation.navigate('SignupScreen'); }}
					>
						<AppText>Register</AppText>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default Welcome;