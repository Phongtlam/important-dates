import { createSwitchNavigator } from 'react-navigation';
import HomeScreen from '../containers/HomeScreen';

export default createSwitchNavigator(
	{
		// AppNavigation: AppNavigation,
		HomeScreen: HomeScreen,
	},
	{
		initialRouteName: 'HomeScreen',
	}
);
