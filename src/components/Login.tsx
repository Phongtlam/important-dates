import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { AppText, AppButton, AppBackgroundWrapper, AppInput } from '../lib/components';
import { UserObject } from '../interfaces';
import { Auth } from '../lib/firebase';
import { UpdateLocalUserObject } from '../actions/user';
import { ToggleAppModal, ToggleLoading } from '../actions/modal';
import { helpers } from '../lib/utils';
import { authscreens } from '../styles/globalStyles';
import Colors from '../styles/colors';

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
	inputFields: Array<any>;
}

class Login extends React.Component<LoginProps, LoginState> {
	constructor(props: LoginProps) {
		super(props);
		this.state = {
			inputFields: [],
		};
	}

	componentDidMount() {
		this.setState({
			inputFields: [
				{
					label: 'Email address',
					type: 'Hoshi',
					onChangeText: (input) => { this.props.actions.updateLocalUserObject({ email: input }); }
				}, {
					label: 'Password',
					type: 'Hoshi',
					onChangeText: (input) => { this.props.actions.updateLocalUserObject({ password: input }); },
					secureTextEntry: true
				}
			]
		});
	}

	_onLogIn = async () => {
		const { email, password } = this.props.userObject;
		this.props.actions.toggleLoading();
		try {
			await Auth.loginSignup('login', {
				email,
				password
			});
			this.props.actions.updateLocalUserObject({ password: '' });
			this.props.navigation.navigate('AppNavigation');
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
						this.state.inputFields.map( inputElement => AppInput.build(inputElement))
					}
				</View>
				<AppButton title='Sign in' style={authscreens.button} onPress={this._onLogIn} />
				<View style={authscreens.textContainer}>
					<AppText style={authscreens.text}>New to the app? </AppText>
					<TouchableOpacity
							style={authscreens.text}
							onPress={() => { this.props.navigation.navigate('SignupScreen'); }}
					>
						<AppText style={authscreens.loginText}>Register here</AppText>
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

export default connect(mapStateToProps, mapDispatchToProps)(AppBackgroundWrapper(Login, Colors.purple800));