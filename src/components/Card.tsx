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
import { Database } from '../lib/firebase';
import Fonts from '../styles/font';
import moment from 'moment';
import { UserObject } from '../interfaces';

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
		height: 50,
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
		width: 130,
		alignItems: 'center',
		alignSelf: 'center',
		borderRadius: 10,
		marginTop: 10,
		marginBottom: 20
	},
	dateDescription: {
		color: Colors.grey,
		paddingRight: 10,
		fontFamily: Fonts.type.base,
		fontSize: Fonts.size.regular,
		paddingLeft: 10,
	},
	saveButton: {
		bottom: 10,
		right: 20,
		position: 'absolute'
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
	userObject: UserObject;
}

interface CardState {
	categories: Array<string>;
	categorySelected: string;
	dateSelected: string;
	canEditTitle: boolean;
	canEditDescription: boolean;
	description: string;
	picture: any;
}

const headerColor = {
	anniversaries: Colors.primaryYellow,
	birthdays: Colors.primary,
	paydays: Colors.jade
};

class Card extends React.Component<CardProps, CardState> {
	descriptionTextInput;
	defaultState = {
		categories: [ 'anniversaries', 'birthdays', 'paydays'],
		categorySelected: 'anniversaries',
		dateSelected: moment().format('MMM d, YYYY'),
		canEditTitle: false,
		canEditDescription: false,
		description: '',
		picture: null
	};
	constructor(props: CardProps) {
		super(props);
		this.state = {
			...this.defaultState
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps.cardState.cardType !== this.props.cardState.cardType) {
			this.setState({ categorySelected: this.props.cardState.cardType });
		}
	}

	onSaveToDb = () => {
		Database.addNewDate(this.props.userObject.uid, {
			type: this.state.categorySelected,
			date: this.state.dateSelected,
			description: this.state.description,
			picture: this.state.picture
		});
		this.closeCard();
	}

	closeCard = () => {
		this.props.actions.toggleCard(false);
		this.setState({
			...this.defaultState
		});
	}

	render() {
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
									this.props.actions.toggleAppModal(true, 'Warning', 'Closing this will erase all data', true, this.closeCard);
								}}
							>
								<FontAwesome name='times' size={30} color={Colors.grey} />
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
							onChangeText={(text) => {
								this.setState({
									description: String(text)
								});
							}}
							maxLength={150}
						/>
						<TouchableOpacity
							disabled={this.state.description === ''}
							style={styles.saveButton}
							onPress={this.onSaveToDb}
						>
							<FontAwesome name='save' size={40} color={this.state.description === '' ? Colors.grey : Colors.primaryRed} />
						</TouchableOpacity>
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