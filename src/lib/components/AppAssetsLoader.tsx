import React from 'react';
import { AppLoading, Font } from 'expo';

class AppAssetsLoader extends React.PureComponent {
	state = {
		fontLoaded: false
	};
	async componentDidMount() {
		try {
			await Font.loadAsync({
				'Avenir-Black': require('../../assets/fonts/Avenir-Black.ttf'),
				'Avenir-Book': require('../../assets/fonts/Avenir-Book.ttf'),
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