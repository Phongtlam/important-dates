import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { AppText, AppButton, AppBackgroundWrapper, AppInput } from '../lib/components';
import { UpdateLocalUserObject } from '../actions/user';
import { UserObject } from '../interfaces';
import { Auth, Database } from '../lib/firebase';
import { ToggleAppModal, ToggleLoading } from '../actions/modal';
import { helpers } from '../lib/utils';
import Colors from '../styles/colors';
import { authscreens } from '../styles/globalStyles';

interface LoginProps {
	navigation: any;
	userObject: UserObject;
	actions: {
		updateLocalUserObject: UpdateLocalUserObject;
		toggleAppModal: ToggleAppModal;
		toggleLoading: ToggleLoading;
	};
}

interface LoginState {
	comparePassword: boolean;
}

class Signup extends React.Component<LoginProps, LoginState> {
	inputFields = [
		{
			label: 'Username',
			type: 'Hoshi',
			onChangeText: (input) => { this.props.actions.updateLocalUserObject({ username: input }); }
		},
		{
			label: 'Email address *',
			type: 'Hoshi',
			onChangeText: (input) => { this.props.actions.updateLocalUserObject({ email: input }); }
		},
		{
			label: 'Password *',
			type: 'Hoshi',
			onChangeText: (input) => { this.props.actions.updateLocalUserObject({ password: input }); },
			secureTextEntry: true
		},
		{
			label: 'Confirm your password *',
			type: 'Hoshi',
			secureTextEntry: true,
			onChangeText: (input: string) => {
				this.setState({
					comparePassword: input === this.props.userObject.password
				});
			}
		},
	];

	constructor(props: LoginProps) {
		super(props);
		this.state = {
			comparePassword: false,
		};
	}

	_onSignup = async () => {
		if (!this.state.comparePassword) {
			this.props.actions.toggleAppModal(true, 'Error', 'Your passwords are not matched');
			return;
		}
		const { userObject, actions, navigation } = this.props;
		this.props.actions.toggleLoading();

		try {
			const responseSignup = await Auth.loginSignup('signup', {
				email: userObject.email,
				password: userObject.password
			});
			actions.updateLocalUserObject({
				password: '',
				uid: responseSignup.user.uid
			});
			if (userObject.username !== '') {
				try {
					await Auth.updateUserProfile(userObject.username);
					try {
						await Database.createNewUser({
							uid: responseSignup.user.uid,
							username: userObject.username,
							email: userObject.email,
							password: ''
						});
						navigation.navigate('AppNavigation');
					} catch (error) {
						this.props.actions.toggleAppModal(true, 'Error', helpers.errorFormat(error.toString()));
					}
				} catch (error) {
					this.props.actions.toggleAppModal(true, 'Error', helpers.errorFormat(error.toString()));
				}
			}
		} catch (error) {
			this.props.actions.toggleAppModal(true, 'Error', helpers.errorFormat(error.toString()));
		}
		this.props.actions.toggleLoading(true);
	}

	render() {
		return (
			<View>
				<View style={authscreens.inputGroup}>
					{
						this.inputFields.map( inputElement => AppInput.build(inputElement))
					}
				</View>
				<AppButton
					style={authscreens.button}
					title='Register'
					onPress={this._onSignup}
				/>
				<View style={authscreens.textContainer}>
					<AppText style={authscreens.text}>Already have an account? </AppText>
					<TouchableOpacity
							style={authscreens.text}
							onPress={() => { this.props.navigation.navigate('LoginScreen'); }}
					>
						<AppText style={authscreens.loginText}>Log in</AppText>
					</TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(AppBackgroundWrapper(Signup, Colors.purple800));