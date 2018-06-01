import * as React from 'react';
import { View } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import Fonts from '../styles/font';
import Colors from '../styles/colors';

interface CalendarProps {
	pickDate: Function;
	onDayLongPress: Function;
	markedDates: any;
}

const Calendar = (props: CalendarProps) => {
	return (
		<View>
			<CalendarList
				onDayPress={(date) => {
					props.pickDate(date);
				}}
				onDayLongPress={(date) => {
					props.onDayLongPress(date, true);
				}}
				theme={{
					calendarBackground: Colors.purple800,
					textSectionTitleColor: Colors.snow,
					todayTextColor: Colors.primary,
					monthTextColor: Colors.primary,
					dayTextColor: Colors.snow,
					textMonthFontFamily: Fonts.type.bold,
					textDayFontFamily: Fonts.type.base,
					textDayHeaderFontFamily: Fonts.type.bold,
				}}
				markedDates={props.markedDates}
			/>
		</View>
	);
};

export default Calendar;
