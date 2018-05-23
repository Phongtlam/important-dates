import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Colors } from '../../styles/colors';

const styles = StyleSheet.create({
	image: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	}
});

const AppBackgroundWrapper = (WrappedComponent: React.ComponentType, backgroundColor: string = Colors.snow, backGroundImage?) => props => (
	<View
		style={{
			flex: 1,
			backgroundColor
		}}
	>
		{
			backGroundImage &&
			<Image source={backGroundImage} style={styles.image} resizeMode='stretch' />
		}
		<WrappedComponent {...props} />
	</View>
);

export default AppBackgroundWrapper;
