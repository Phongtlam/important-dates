import * as React from 'react';
import Calendar from '../components/Calendar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { View, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { AppText } from '../lib/components';
import Colors from '../styles/colors';
import Fonts from '../styles/font';

interface CalendarScreenProps {
	actions: any;
	selectedDates: any;
	savedDates: any;
	longPressStartDate: string;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	calendar: {
		flex: 1
	},
	buttonGroup: {
		position: 'absolute',
		bottom: 0,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		backgroundColor: Colors.snow,
	},
	button: {
		position: 'relative',
		maxWidth: 100,
		height: '100%',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	appText: {
		fontFamily: Fonts.type.bold,
	}
});

const { height } = Dimensions.get('window');

class CalendarScreen extends React.Component<CalendarScreenProps> {
	buttonGroupHeight = new Animated.Value(0);

	componentDidUpdate() {
		const savedDates = JSON.stringify(this.props.savedDates);
		const selectedDates = JSON.stringify(this.props.selectedDates);
		if (savedDates !== selectedDates) {
			this.animate(true);
		} else if (savedDates === selectedDates) {
			this.animate();
		}
	}

	animate(isUp?: boolean) {
		Animated.timing(this.buttonGroupHeight, {
			toValue: isUp ? (height / 12) : 0,
			duration: 200
		}).start();
	}

	render() {
		const { actions } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.calendar}>
					<Calendar
						pickDate={actions.toggleDateAsync}
						markedDates={this.props.selectedDates}
						onDayLongPress={actions.onDayLongPress}
					/>
				</View>
				<Animated.View style={[
					styles.buttonGroup,
					{
						height: this.buttonGroupHeight,
					}
				]}>
					<TouchableOpacity
						style={[styles.button, { marginLeft: 10 }]}
						onPress={() => {
							actions.saveOrUndo('undo');
						}}
					>
						<AppText style={styles.appText}>Undo</AppText>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.button, { marginRight: 10 }
						]}
						onPress={() => {
							actions.saveOrUndo('save');
							actions.saveSelectedDatesToDbAsync();
						}}
					>
						<AppText style={styles.appText}>Save</AppText>
					</TouchableOpacity>
				</Animated.View>
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

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);
