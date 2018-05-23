import * as React from 'react';
import {
	StyleSheet,
	View,
	Modal,
	ActivityIndicator
} from 'react-native';
import { connect, Dispatch } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import { Colors } from '../../styles/colors';
import { modalWrapper } from '../../styles/globalStyles';
import debounce from 'lodash.debounce';

const styles = StyleSheet.create({
	activityIndicatorWrapper: {
		backgroundColor: Colors.snow,
		height: 100,
		width: 100,
		borderRadius: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around'
	}
});

interface AppLoadingProps {
	isLoadingScreen?: boolean;
	actions?: any;
}

class AppLoading extends React.PureComponent<AppLoadingProps> {
	isUnmounted = false;
	timeoutMethod = debounce(() => {
		if (!this.isUnmounted && this.props.isLoadingScreen) {
			this.props.actions.toggleLoading(false);
			this.props.actions.toggleAppModal(true, 'Error', 'We are not entirely sure why this is happening. Will you please try again?', true);
		}
	}, 10000);

	componentDidUpdate() {
		if (this.props.isLoadingScreen) {
			this.timeoutMethod();
		}
	}

	componentWillUnmount() {
		// prevent the debounced method from running after we unmount
		this.isUnmounted = true;
	}

	render() {
		return (
			<Modal
				transparent={true}
				animationType={'none'}
				visible={this.props.isLoadingScreen}
				onRequestClose={() => { console.log('close modal'); }}>
				<View style={modalWrapper.background}>
					<View style={styles.activityIndicatorWrapper}>
						<ActivityIndicator
							animating={this.props.isLoadingScreen}
							size='large'
							color={Colors.primary}
						/>
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

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		actions: bindActionCreators(ActionCreators, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLoading);
