import moxios from 'moxios';
import expect from 'expect';
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
	SET_POSTS,
	LOADING_DATA,
	LOADING_UI,
	LIKE_POST,
	UNLIKE_POST,
	DELETE_POST,
	CREATE_POST,
	CLEAR_ERRORS,
	STOP_LOADING_UI,
	SET_POST,
	SUBMIT_COMMENT } from '../actions/actionTypes';

describe('dataActions', () => {
	const middlewares = [thunk];
	const mockStore = configureMockStore(middlewares);

	beforeEach(() => {
		moxios.install();
	});

	// ASYNC ACTION
	// getPosts - when calling LOADING_DATA, we dispatch SET_POSTS with expected payload
	it('should dispatch an action to get posts', () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200
			});
		});

		const expectedActions = [
			{ type: LOADING_DATA},
			{ type: SET_POSTS}
		]

		const store = mockStore({ posts: [] })

		return store.dispatch(getPosts()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	})

	// likePost - we dispatch LIKE_POST with expected payload
	it('should dispatch an action to like a post', () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200
			});
		});

		const expectedActions = [
			{ type: LIKE_POST }
		]

		const store = mockStore({ posts: [] })

		return store.dispatch(likePost()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	})

	// SYNC ACTION
	it('should dispatch an action to clear errors', () => {
		const initialState = {}
		const store = mockStore(initialState)

		store.dispatch(clearErrors())

		const actions = store.getActions()
		const expectedPayload = { type: CLEAR_ERRORS }
		expect(actions).toEqual([expectedPayload])
	})

	afterEach(() => {
		moxios.uninstall();
	})
})