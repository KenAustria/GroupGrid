import reducer from './dataReducer';
import { 
	SET_POSTS,
	LIKE_POST,
	UNLIKE_POST,
	LOADING_DATA,
	DELETE_POST,
	CREATE_POST,
	SET_POST,
	SUBMIT_COMMENT } from '../actions/actionTypes';

	const initialState = {
		posts: [],
  	post: {},
  	loading: false
	}

describe('dataReducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState)
	})

	// set data, assign data, compare data
	it('should load data', () => {
		expect(reducer(initialState, {
			type: LOADING_DATA,
			posts: [],
  		post: {},
			loading: true
		})).toEqual({
			posts: [],
  		post: {},
			loading: true
		});
	})
})

