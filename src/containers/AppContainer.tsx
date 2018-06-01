import * as React from 'react';
import RootNavigation from '../navigation';
import { AppAssetsLoader, AppLoading } from '../lib/components';
import AppModal from '../lib/components/AppModal';

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
			</AppAssetsLoader>
		);
	}
}

export default AppContainer;
