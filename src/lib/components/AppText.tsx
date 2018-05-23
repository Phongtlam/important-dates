import React from 'react';
import {
	Text,
	StyleSheet,
} from 'react-native';
import * as Font from '../../styles/font';

const styles = StyleSheet.create({
	appText: {
		fontFamily: Font.type.base,
		fontSize: Font.size.medium,
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