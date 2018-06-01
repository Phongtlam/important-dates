import * as React from 'react';
import { View } from 'react-native';
import AppText from '../lib/components/AppText';
import { AppButton, AppBackgroundWrapper } from '../lib/components';
import { Auth } from '../lib/firebase';
import Colors from '../styles/colors';

class HomeScreen extends React.Component {
	render() {
		return (
			<View>
				<AppText>THIS IS HOME</AppText>
				<AppButton title='Logout' onPress={() => { Auth.logout(); this.props.navigation.navigate('AuthNavigation'); }} />
			</View>
		);
	}
}

export default AppBackgroundWrapper(HomeScreen, Colors.purple800);