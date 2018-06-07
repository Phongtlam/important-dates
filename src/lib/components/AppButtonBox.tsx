import * as React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { Ionicons, FontAwesome, Feather } from '@expo/vector-icons/';
import Colors from '../../styles/colors';

interface AppButtonBoxProps {
	style?: any;
	image?: any;
	onPress: Function;
	icon: {
		type: string;
		name: string;
		color?: string;
	};
}

const { width } = Dimensions.get('window');
const buttonWidth = width / 2;
const iconWidth = buttonWidth / 2;

const styles = StyleSheet.create({
	container: {
		width: buttonWidth,
		aspectRatio: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		height: buttonWidth,
		width: buttonWidth
	}
});

class AppButtonBox extends React.PureComponent<AppButtonBoxProps> {
	render () {
		let iconDisplay;
		if (!this.props.image && this.props.icon) {
			switch (this.props.icon.type) {
				case 'Ionicons':
					iconDisplay = <Ionicons name={this.props.icon.name} size={iconWidth} color={this.props.icon.color ? this.props.icon.color : Colors.snow} />;
					break;
				case 'FontAwesome':
					iconDisplay = <FontAwesome name={this.props.icon.name} size={iconWidth} color={this.props.icon.color ? this.props.icon.color : Colors.snow} />;
					break;
				case 'Feather':
					iconDisplay = <Feather name={this.props.icon.name} size={iconWidth} color={this.props.icon.color ? this.props.icon.color : Colors.snow} />;
					break;
				default:
					iconDisplay = <Ionicons name={this.props.icon.name} size={iconWidth} color={this.props.icon.color ? this.props.icon.color : Colors.snow} />;
			}
		}
		return (
			<TouchableOpacity style={[styles.container, this.props.style]} onPress={() => { this.props.onPress(); }}>
				{
					this.props.image ?
					<Image resizeMode='stretch' source={this.props.image} style={styles.image} /> :
					iconDisplay
				}
			</TouchableOpacity>
		);
	}
}

export default AppButtonBox;