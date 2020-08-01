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

// SYNC ACTION
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