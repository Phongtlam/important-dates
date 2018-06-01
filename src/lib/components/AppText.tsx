import React from 'react';
import {
	Text,
	StyleSheet,
} from 'react-native';
import Font from '../../styles/font';
import Colors from '../../styles/colors';

const styles = StyleSheet.create({
	appText: {
		fontFamily: Font.type.base,
		fontSize: Font.size.regular,
		color: Colors.snow
	},
});

interface AppTextProps {
	style?: any;
	children: string | string[] | number | (string | string[])[];
	onPress?(): void;
}

const AppText = ({ style, children = '', ...props }: AppTextProps ) => {
	const textStyle = style ? [styles.appText, style] : styles.appText;
	return (
		<Text {...props} style={textStyle}>
			{children}
		</Text>
	);
};

export default AppText;