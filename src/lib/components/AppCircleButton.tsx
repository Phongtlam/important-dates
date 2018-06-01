import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Colors from '../../styles/colors';
import { Ionicons } from '@expo/vector-icons/';

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		flex: 1,
		zIndex: 10,
	},
	circle: {
		borderWidth: 1,
		height: 55,
		width: 55,
		borderRadius: 27.5,
	},
	icon: {
		position: 'absolute',
	},
	wrapper: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

interface AppCircleButtonProps {
	iconName: string;
	color: string;
	onPress?: Function;
	style?: any;
	fill?: boolean;
}

const AppCircleButton = ({ iconName, color, onPress, fill, ...props }: AppCircleButtonProps) => {
	const btnColor = color ? color : Colors.default;
	return (
		<TouchableOpacity
			onPress={() => {
				if (onPress) onPress();
			}}
			style={[styles.container, props.style ? props.style : {}]}>
			<View style={styles.wrapper}>
				<View style={[
					styles.circle,
					fill ? {
						backgroundColor: btnColor,
						borderColor: btnColor,
					} : {
						borderColor: btnColor,
					},
				]} />
				<Ionicons style={styles.icon} name={iconName} size={25} color={fill ? Colors.snow : btnColor} />
			</View>
		</TouchableOpacity>
	);
};

export default AppCircleButton;