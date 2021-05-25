import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './_reducers/userReducer';
import uiReducer from './_reducers/uiReducer';
import dataReducer from './_reducers/dataReducer';

const initialState = {};

const middleware = [thunk];

const rootReducer = combineReducers({
	user: userReducer,
	ui: uiReducer,
	data: dataReducer
});

// Safari not able to handle Redux Dev Tool.
let myStore;
if (window.navigator.userAgent.includes('Chrome')) {
	myStore = createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(...middleware)
		)
	);
} else {
	myStore = createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(...middleware)
		)
	);
}

export default myStore;