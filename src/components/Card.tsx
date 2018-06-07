import * as React from 'react';
import { View, Dimensions, StyleSheet, Modal, Picker, TouchableOpacity, TextInput } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { modalWrapper } from '../styles/globalStyles';
import Colors from '../styles/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons/';
import { ToggleCard } from '../actions/card';
import { ToggleAppModal } from '../actions/modal';
import { AppText, AppButtonBox } from '../lib/components';
import Fonts from '../styles/font';
import moment from 'moment';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		height: 0.8 * height,
		width: 0.8 * width,
		backgroundColor: Colors.snow,
		borderRadius: 10
	},
	closeButton: {
		paddingRight: 20
	},
	dateGroup: {
		width: '50%',
		paddingLeft: 10,
		display: 'flex',
		flexDirection: 'row'
	},
	header: {
		borderBottomWidth: 3,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: 70,
		alignItems: 'center',
	},
	dateText: {
		color: Colors.grey,
		lineHeight: 70,
		paddingRight: 15
	},
	cameraBox: {
		borderWidth: 3,
		aspectRatio: 1,
		width: 160,
		alignItems: 'center',
		alignSelf: 'center',
		borderRadius: 10,
		marginTop: 20,
		marginBottom: 30
	},
	dateDescription: {
		color: Colors.grey,
		paddingRight: 15,
		fontFamily: Fonts.type.base,
		fontSize: Fonts.size.regular,
		paddingLeft: 10
	}
});

interface CardProps {
	actions: {
		toggleCard: ToggleCard;
		toggleAppModal: ToggleAppModal;
	};
	cardState: {
		cardType: string;
		isOpen: boolean;
	};
}

interface CardState {
	categories: Array<string>;
	categorySelected: string;
	dateSelected: string;
	canEditTitle: boolean;
	canEditDescription: boolean;
}

const headerColor = {
	anniversaries: Colors.primaryRed,
	birthdays: Colors.primary,
	paydays: Colors.jade
};

class Card extends React.Component<CardProps, CardState> {
	descriptionTextInput;
	constructor(props: CardProps) {
		super(props);
		this.state = {
			categories: [ 'anniversaries', 'birthdays', 'paydays'],
			categorySelected: 'anniversaries',
			dateSelected: moment().format('MMM d, YYYY'),
			canEditTitle: false,
			canEditDescription: false
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps.cardState.cardType !== this.props.cardState.cardType) {
			this.setState({ categorySelected: this.props.cardState.cardType });
		}
	}

	render() {
		const closeCard = () => { this.props.actions.toggleCard(false); };
		const colorMatched = headerColor[this.state.categorySelected];
		return (
			<Modal
				transparent={true}
				animationType={'slide'}
				visible={this.props.cardState.isOpen}
				onRequestClose={() => { console.log('close modal'); }}
			>
				<View style={modalWrapper.background}>
					<View style={styles.container}>
						<View
							style={[ styles.header, { borderBottomColor: colorMatched }]}
						>
							<View style={styles.dateGroup}>
								<AppText style={styles.dateText}>{this.state.dateSelected}</AppText>
								<TouchableOpacity
									style={{ top: 20 }}
									onPress={() => { console.log('calendar'); }}
								>
									<Ionicons name='ios-calendar' size={25} color={colorMatched} />
								</TouchableOpacity>
							</View>
							<TouchableOpacity
								style={styles.closeButton}
								onPress={() => {
									this.props.actions.toggleAppModal(true, 'Warning', 'Closing this will erase all data', true, closeCard);
								}}
							>
								<FontAwesome name='times' size={40} color={colorMatched} />
							</TouchableOpacity>
						</View>
						<Picker
							selectedValue={this.state.categorySelected}
							style={{ height: 50, width: 200 }}
							onValueChange={(itemValue, itemIndex) => this.setState({ categorySelected: itemValue })}>
							{
								this.state.categories.map(category =>
									<Picker.Item
										key={category.toLocaleLowerCase()}
										label={category.toLocaleLowerCase()}
										value={category}
										color={Colors.grey}
									/>
								)
							}
						</Picker>
						<AppButtonBox
							onPress={() => { console.log('camera'); }}
							style={[styles.cameraBox, {
								borderColor: colorMatched
							}]}
							icon={{
								type: 'FontAwesome',
								name: 'camera',
								color: Colors.grey
							}}
						/>

						<View style={[styles.dateGroup, { width: '90%' }]}>
						<AppText style={{ color: colorMatched, paddingRight: 15 }}>Description:</AppText>
							<TouchableOpacity
								onPress={ () => {
									this.setState({ canEditDescription: !this.state.canEditDescription }, () => {
										this.descriptionTextInput.focus();
									});
								}}
							>
								<FontAwesome name='pencil' size={25} color={colorMatched} />
							</TouchableOpacity>
						</View>
						<TextInput
							style={styles.dateDescription}
							editable={this.state.canEditDescription}
							selectTextOnFocus={false}
							underlineColorAndroid='transparent'
							multiline={true}
							ref={(input) => { this.descriptionTextInput = input; }}
						>
							Date Description
						</TextInput>
					</View>
				</View>
			</Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(Card);