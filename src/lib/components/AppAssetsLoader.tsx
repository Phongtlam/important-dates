import React from 'react';
import { AppLoading, Font } from 'expo';
import { Fonts } from '../../assets';

class AppAssetsLoader extends React.PureComponent {
	state = {
		fontLoaded: false
	};
	async componentDidMount() {
		try {
			await Font.loadAsync({
				...Fonts
			});
			this.setState({ fontLoaded: true });
		} catch (error) {
			console.log('error loading icon fonts', error);
		}
	}
	render() {
		if (!this.state.fontLoaded) {
			return <AppLoading />;
		}
		return this.props.children;
	}
}

export default AppAssetsLoader;