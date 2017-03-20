import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

import rootReducer from  './reducers';

export default (initialState = {}) => {
	return createStore(
		rootReducer,
		initialState,
		composeEnhancers(
			applyMiddleware(thunk)
		)
	);
}