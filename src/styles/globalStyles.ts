import { StyleSheet } from 'react-native';
import Colors from './colors';

export const modalWrapper = StyleSheet.create({
	background: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'space-around',
		backgroundColor: '#00000040'
	}
});

export const authscreens = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-end'
	},
	button: {
		marginLeft: 30,
		marginRight: 30,
		backgroundColor: Colors.primaryRed,
		borderRadius: 22.5
	},
	inputGroup: {
		marginBottom: 15
	},
	textContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	text: {
		marginTop: 20
	},
	loginText: {
		color: Colors.primaryRed
	}
});
