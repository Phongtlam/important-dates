import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { AppButton, AppBackgroundWrapper } from '../lib/components';
import { Images } from '../assets';
import Colors from '../styles/colors';
import Fonts from '../styles/font';
import { authscreens } from '../styles/globalStyles';
import { auth } from '../lib/firebase/firebase';
import { UpdateLocalUserObject } from '../actions/user';
import { ToggleAppModal, ToggleLoading } from '../actions/modal';
import { helpers } from '../lib/utils';

interface WelcomeProps {
	navigation: any;
	actions: {
		updateLocalUserObject: UpdateLocalUserObject;
		toggleAppModal: ToggleAppModal;
		toggleLoading: ToggleLoading;
	};
}

interface WelcomeState {
	isAutoLogin: boolean;
}

const styles = StyleSheet.create({
	titleText: {
		top: '20%',
		fontSize: Fonts.size.h3,
		color: Colors.primaryRed,
		alignSelf: 'center',
		fontFamily: Fonts.type.bold
	},
	signin: {
		marginBottom: 20
	},
	register: {
		backgroundColor: 'transparent',
		borderColor: Colors.primaryRed,
		borderWidth: 2,
		marginBottom: 20
	}
});

class Welcome extends React.Component<WelcomeProps, WelcomeState> {
	constructor(props: WelcomeProps) {
		super(props);
		this.state = {
			isAutoLogin: true
		};
	}
	async componentDidMount() {
		if (!this.state.isAutoLogin) {
			return;
		}
		try {
			auth.onAuthStateChanged( user => {
				if (user) {
					this.props.actions.toggleLoading();
					const { displayName, email, uid } = user;
					const payLoad: any = {
						email,
						uid
					};
					if (displayName) {
						payLoad.displayName = displayName;
					}
					this.props.actions.updateLocalUserObject(payLoad);
					this.props.navigation.navigate('AppNavigation');
					this.props.actions.toggleLoading(true);
				} else {
					this.setState({ isAutoLogin: false });
				}
			});
		} catch (error) {
			this.props.actions.toggleLoading(true);
			this.props.actions.toggleAppModal(true, 'Error', helpers.errorFormat(error.toString()));
		}
	}
	render() {
		return (
			<View style={authscreens.container}>
				<View>
					<AppButton title='Sign in' style={[styles.signin, authscreens.button]} onPress={() => {this.props.navigation.navigate('LoginScreen'); }} />
					<AppButton
						title='Register'
						style={[authscreens.button, styles.register]}
						textStyle={{ color: Colors.primaryRed }}
						onPress={() => {this.props.navigation.navigate('SignupScreen'); }}
					/>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		...state
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(ActionCreators, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBackgroundWrapper(Welcome, undefined, { source: Images.calendar }, true));
