import * as React from 'react';
import RootNavigation from '../navigation';
import { AppAssetsLoader, AppLoading } from '../lib/components';
import AppModal from '../lib/components/AppModal';
import Card from '../components/Card';

class AppContainer extends React.PureComponent {
	constructor(props) {
		super(props);
		console.ignoredYellowBox = [
			'Setting a timer'
		];
	}
	public render() {
		return (
			<AppAssetsLoader>
				<RootNavigation />
				<AppLoading />
				<AppModal />
				<Card />
			</AppAssetsLoader>
		);
	}
}

export default AppContainer;
