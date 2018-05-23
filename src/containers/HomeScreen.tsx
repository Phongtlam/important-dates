import * as React from 'react';
import { View } from 'react-native';
import AppText from '../lib/components/AppText';

class HomeScreen extends React.Component {
	render() {
		return (
			<View>
				<AppText>THIS IS HOME</AppText>
			</View>
		);
	}
}

export default HomeScreen;