import { createSwitchNavigator } from 'react-navigation';
// import AppNavigation from './AppNavigation';
import AuthScreen from '../containers/AuthScreen';

export default createSwitchNavigator(
	{
		// AppNavigation: AppNavigation,
		AuthNavigation: AuthScreen,
	},
	{
		initialRouteName: 'AuthNavigation',
	}
);
