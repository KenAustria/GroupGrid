import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import uiReducer from './reducers/uiReducer';

const initialState = {};

const middleware = [thunk];

const rootReducer = combineReducers({
	user: userReducer,
	ui: uiReducer
});

const myStore = createStore(
  rootReducer,
	initialState,
	compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default myStore;