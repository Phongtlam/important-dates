import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/store';
import AppContainer from './src/containers/AppContainer';

const store = configureStore({});

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<AppContainer />
			</Provider>
		);
	}
}

export default App;