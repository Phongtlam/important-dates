import * as React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Colors from '../../styles/colors';

const styles = StyleSheet.create({
	image: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width
	},
	overlay: {
		position: 'absolute',
		opacity: 1,
		backgroundColor: Colors.purple800,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	}
});

const AppBackgroundWrapper = (
	WrappedComponent: React.ComponentType<any>,
	backgroundColor: string = Colors.snow,
	backGroundImage?: { style?: any, source: any },
	overlay?: any
) => props => (
	<View
		style={{
			flex: 1,
			backgroundColor
		}}
	>
		{
			overlay &&
			<View
				style={[styles.overlay, overlay.styles ? overlay.styles : {}]}
			/>
		}
		{
			backGroundImage &&
			<Image
				source={backGroundImage.source}
				style={[
					styles.image,
					backGroundImage.style ? backGroundImage.style : {},
					overlay ? { opacity: 0.3 } : {}
				]}
			/>
		}
		<WrappedComponent {...props} />
	</View>
);

export default AppBackgroundWrapper;
