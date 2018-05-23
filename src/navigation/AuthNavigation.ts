import { createStackNavigator } from 'react-navigation';
import Welcome from '../components/Welcome';
import Login from '../components/Login';
import Signup from '../components/Signup';

export default createStackNavigator(
	{
		WelcomeScreen: Welcome,
		LoginScreen: Login,
		SignupScreen: Signup
	},
	{
		initialRouteName: 'WelcomeScreen',
		headerMode: 'none'
	}
);
