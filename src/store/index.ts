import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
// import { createLogger } from 'redux-logger';

// const loggerMiddware = createLogger({ predicate: (getState, action) => __DEV__ });

const configureStore = (initialState) => {
	const enhancer = compose(
		applyMiddleware(
			thunkMiddleware,
			// loggerMiddware
		)
	);
	return createStore(rootReducer, initialState, enhancer);
};

export default configureStore;