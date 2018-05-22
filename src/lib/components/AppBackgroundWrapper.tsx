import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Colors } from '../../styles/Colors';

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.snow,
		flex: 1,
	},
	image: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	}
});

const AppBackgroundWrapper = (WrappedComponent: typeof React.Component, backGroundImage?) => props => (
	<View style={styles.container}>
		{
			backGroundImage &&
			<Image source={backGroundImage} style={styles.image} resizeMode='stretch' />
		}
		<WrappedComponent {...props} />
	</View>
);

export default AppBackgroundWrapper;
