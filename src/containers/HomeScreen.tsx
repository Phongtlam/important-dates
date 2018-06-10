import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { AppButton, AppBackgroundWrapper, AppButtonBox } from '../lib/components';
import { Auth } from '../lib/firebase';
import Colors from '../styles/colors';
import { Images } from '../assets';
import { ToggleCard } from '../actions/card';

interface HomeScreenProps {
	navigation: any;
	actions: {
		toggleCard: ToggleCard;
	};
}

interface HomeScreenState {
	buttonsGroup: Array<any>;
}

const styles = StyleSheet.create({
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around'
	},
	plusIcon: {
		borderWidth: 3,
		borderColor: Colors.snow
	}
});

class HomeScreen extends React.Component<HomeScreenProps, HomeScreenState> {
	constructor(props: HomeScreenProps) {
		super(props);
		this.state = {
			buttonsGroup: [
				{
					image: Images.anniversary,
					onPress: () => { this.props.actions.toggleCard('anniversaries'); },
					key: 'anniversaries'
				},
				{
					image: Images.birthdays,
					onPress: () => { this.props.actions.toggleCard('birthdays'); },
					key: 'birthdays'
				},
				{
					image: Images.paycheck,
					onPress: () => { this.props.actions.toggleCard('paydays'); },
					key: 'paydays'
				},
				{
					icon: { type: 'FontAwesome', name: 'plus' },
					onPress: () => { console.log('plus'); },
					style: styles.plusIcon,
					key: 'add new important dates'
				},
			]
		};
	}

	render() {
		return (
			<ScrollView>
				<AppButton title='Logout' onPress={() => { Auth.logout(); this.props.navigation.navigate('AuthNavigation'); }} />
				<View style={styles.buttonContainer}>
					{
						this.state.buttonsGroup.map( button =>
							<AppButtonBox
								key={button.key}
								icon={button.icon}
								image={button.image}
								onPress={button.onPress}
								style={button.style}
							/>
						)
					}
				</View>
			</ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(AppBackgroundWrapper(HomeScreen, Colors.purple800));