import axios from 'axios';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
	getPosts,
	likePost,
	unlikePost,
	deletePost,
	createPost,
	getPost,
	submitComment,
	clearErrors
} from '../actions/dataActions';
import {
	SET_USER,
	SET_ERRORS,
	CLEAR_ERRORS,
	LOADING_UI,
	SET_UNAUTHENTICATED,
	LOADING_USER,
	LOADING_DATA,
	SET_POSTS,
	SET_POST,
	MARK_NOTIFICATIONS_READ } from '../actions/actionTypes';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('dataActions', () => {
	it('should dispatch an action to clear errors', () => {
		const initialState = {}
		const store = mockStore(initialState)

		store.dispatch(clearErrors())

		const actions = store.getActions()
		const expectedPayload = { type: CLEAR_ERRORS }
		expect(actions).toEqual([expectedPayload])
	})
})