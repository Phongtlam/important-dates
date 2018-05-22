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
		color: '#fff'
	},
});

interface AppTextProps {
	style?: any;
	children: string | string[] | number | (string | string[])[];
	onPress?(): void;
}

const AppText = ({ style, children, ...props }: AppTextProps = { style: {}, children: '' } ) => {
	let newStyle;
	if (Array.isArray(style)) {
		newStyle = [styles.appText, ...style];
	} else {
		newStyle = [styles.appText, style];
	}

	return (
		<Text {...props} style={newStyle}>
			{children}
		</Text>
	);
};

export default AppText;