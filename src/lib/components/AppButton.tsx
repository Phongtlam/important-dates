import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../../styles/colors';
import * as Font from '../../styles/font';

interface ButtonProps {
	title?: string;
	onPress?: Function;
	style?: any;
	color?: string;
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	buttonText: {
		color: Colors.snow,
		textAlign: 'center',
		fontSize: Font.size.medium,
		fontFamily: Font.type.bold,
	},
});

const AppButton = (props: ButtonProps) => {
	return (
		<TouchableOpacity
			onPress={(e) => {
				if (props.onPress) {
					props.onPress(e);
				} else {
					return;
				}
			}}
			style={[
				{
					height: 45,
					borderRadius: 3,
					backgroundColor: props.color ? props.color : Colors.primary,
					justifyContent: 'center'
				},
				props.style
			]}
		>
			<Text style={styles.buttonText}>
				{props.title}
			</Text>
		</TouchableOpacity>
	);
};

export default AppButton;