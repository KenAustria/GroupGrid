import reducer from './userReducer';
import { 
	SET_AUTHENTICATED,
	SET_UNAUTHENTICATED,
	SET_USER,
	LOADING_USER,
	LIKE_POST,
	UNLIKE_POST,
	MARK_NOTIFICATIONS_READ } from '../actions/actionTypes';

const initialState = {
	authenticated: false,
	credentials: {},
	likes: [],
	notifications: [],
	loading: false
}

describe('userReducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState)
	})

	it('should set authenticated', () => {
		expect(reducer(initialState, {
			type: SET_AUTHENTICATED,
			authenticated: false,
  		credentials: {},
  		likes: [],
			notifications: [],
			loading: false
		})).toEqual({
			authenticated: true,
  		credentials: {},
  		likes: [],
			notifications: [],
			loading: false
		});
	})

	it('should set unauthenticated', () => {
		expect(reducer(initialState, {
			type: SET_UNAUTHENTICATED,
			authenticated: false,
  		credentials: {},
  		likes: [],
			notifications: [],
			loading: false
		})).toEqual({
			authenticated: false,
  		credentials: {},
  		likes: [],
			notifications: [],
			loading: false
		});
	})

	it('should load user', () => {
		expect(reducer(initialState, {
			type: LOADING_USER,
			authenticated: false,
  		credentials: {},
  		likes: [],
			notifications: [],
			loading: true
		})).toEqual({
			authenticated: false,
  		credentials: {},
  		likes: [],
			notifications: [],
			loading: true
		});
	})
})