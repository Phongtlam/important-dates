import * as React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import HomeScreen from '../containers/HomeScreen';
import CalendarScreen from '../containers/CalendarScreen';
import AllDatesScreen from '../containers/AllDatesScreen';
import { Ionicons } from '@expo/vector-icons/';
import Colors from '../styles/colors';
import { AppText } from '../lib/components';

export default createMaterialBottomTabNavigator(
	{
		Home: HomeScreen,
		Calendar: CalendarScreen,
		AllDates: AllDatesScreen
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
				} else if (routeName === 'AllDates') {
					iconName = `ios-options${focused ? '' : '-outline'}`;
				}
				return <Ionicons name={iconName} size={25} color={tintColor} />;
			},
			tabBarColor: Colors.purple700,
			tabBarLabel: (navigation.state.routeName === 'AllDates') ? 'DATES' : navigation.state.routeName.toUpperCase()
		}),
		activeTintColor: Colors.snow,
		inactiveTintColor: Colors.default,
		initialRouteName: 'Home',
		shifting: true
	}
);
