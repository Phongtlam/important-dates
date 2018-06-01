import * as React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import HomeScreen from '../containers/HomeScreen';
import CalendarScreen from '../containers/CalendarScreen';
import { Ionicons } from '@expo/vector-icons/';
import Colors from '../styles/colors';
import { AppText } from '../lib/components';

export default createMaterialBottomTabNavigator(
	{
		Home: HomeScreen,
		Calendar: CalendarScreen,
	},
	{
		navigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, tintColor }) => {
				const { routeName } = navigation.state;
				let iconName;
				if (routeName === 'Home') {
					iconName = `ios-home${focused ? '' : '-outline'}`;
				} else if (routeName === 'Calendar') {
					iconName = `ios-calendar${focused ? '' : '-outline'}`;
				}
				return <Ionicons name={iconName} size={25} color={tintColor} />;
			},
			tabBarColor: Colors.purple700,
			title: navigation.state.routeName.toUpperCase()
		}),
		activeTintColor: Colors.snow,
		inactiveTintColor: Colors.default,
		initialRouteName: 'Home',
		shifting: true
	}
);
