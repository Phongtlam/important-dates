import * as React from 'react';
import { modalWrapper } from '../../styles/globalStyles';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import debounce from 'lodash.debounce';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { AppText } from '.';
import Colors from '../../styles/colors';
import Fonts from '../../styles/font';

const styles = StyleSheet.create({
	modalContainer: {
		backgroundColor: Colors.snow,
		borderRadius: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginHorizontal: 20
	},
	modalTextWrapper: {
		padding: 10,
	},
	modalText: {
		color: '#000',
		padding: 5,
	},
	confirmButton: {
		alignSelf: 'flex-end',
		paddingRight: 20,
		paddingBottom: 20,
		color: Colors.danger
	}
});

interface AppModalProps {
	modalData?: any;
	actions?: any;
}

class AppModal extends React.PureComponent<AppModalProps> {
	isUnmounted;
	timeoutMethod = debounce(() => {
		if (!this.isUnmounted) {
			this.props.actions.toggleAppModal(false);
		}
	}, 5000);

	componentDidUpdate() {
		if (!this.props.modalData.stayOpen && this.props.modalData.isOpen) {
			this.timeoutMethod();
		}
	}

	componentWillUnmount() {
		// prevent the debounced method from running after we unmount
		this.isUnmounted = true;
	}

	render() {
		const { modalData, actions } = this.props;
		return (
			<Modal
				transparent={true}
				animationType={'none'}
				visible={modalData.isOpen}
				onRequestClose={() => { console.log('close modal'); }}
			>
				<View style={modalWrapper.background}>
					<View style={styles.modalContainer}>
						<View>
							<View style={styles.modalTextWrapper}>
								<AppText
									style={{
										color: modalData.modalType === 'Error' ? Colors.danger : modalData.modalType === 'Info' ? Colors.primary : Colors.success,
										fontFamily: Fonts.type.bold,
										padding: 5,
									}}
								>
									{modalData.modalType}
								</AppText>
								<View>
									<AppText style={styles.modalText}>{modalData.modalText}</AppText>
								</View>
							</View>
							<TouchableOpacity
								onPress={() => {
									actions.toggleAppModal(false);
								}}
							>
								<AppText style={styles.confirmButton}>OK</AppText>
							</TouchableOpacity>
						</View>
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

export default connect(mapStateToProps, mapDispatchToProps)(AppModal);