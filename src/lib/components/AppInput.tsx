import * as React from 'react';
import { StyleSheet } from 'react-native';
import Colors from '../../styles/colors';
import { Hoshi } from 'react-native-textinput-effects';
import Fonts from '../../styles/font';

export const styles = StyleSheet.create({
	textInputBaseStyle: {
		marginLeft: 20,
		marginRight: 20,
	},
	textInputField: {
		color: Colors.snow,
		fontFamily: Fonts.type.base,
	},
	textInputLabel: {
		fontFamily: Fonts.type.bold,
		color: Colors.primaryRed
	}
});

class AppInput extends React.Component {
	static build(inputElement) {
		if (!inputElement.type) {
			throw('need to have type for inputElement');
		}
		switch (inputElement.type) {
			case 'Hoshi':
				return (
					<Hoshi
						secureTextEntry={inputElement.secureTextEntry}
						key={inputElement.label}
						inputStyle={styles.textInputField}
						style={styles.textInputBaseStyle}
						labelStyle={styles.textInputLabel}
						autoCorrect={false}
						label={inputElement.label}
						borderColor={Colors.snow}
						onChangeText={inputElement.onChangeText}
					/>
				);
			default: return;
		}
	}
}

export default AppInput;