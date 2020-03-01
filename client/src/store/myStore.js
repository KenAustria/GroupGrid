import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const initialState = {};

const composeEnhancers = ((window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || compose);

const rootReducer = combineReducers({});

const myStore = createStore(
  rootReducer,
	initialState,
	composeEnhancers(applyMiddleware(thunk))
);

export default myStore;