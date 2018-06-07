import { createSwitchNavigator } from 'react-navigation';
import AppNavigation from './AppNavigation';
import AuthNavigation from './AuthNavigation';

export default createSwitchNavigator(
	{
		AppNavigation: AppNavigation,
		AuthNavigation: AuthNavigation,
	},
	{
		initialRouteName: 'AppNavigation',
	}
);
