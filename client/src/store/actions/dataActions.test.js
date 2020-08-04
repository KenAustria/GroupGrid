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

	// likePost
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

	// unlikePost
	it('should dispatch an action to unlike a post', () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200
			});
		});

		const expectedActions = [
			{ type: UNLIKE_POST }
		]

		const store = mockStore({ posts: [] })

		return store.dispatch(unlikePost()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	})

	// deletePost
	it('should dispatch an action to delete a post', () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200
			});
		});

		const expectedActions = [
			{ type: DELETE_POST }
		]

		const store = mockStore({ posts: [] })

		return store.dispatch(deletePost()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	})

	// createPost
	it('should dispatch an action to create a post', () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200
			});
		});

		const expectedActions = [
			{ type: LOADING_UI },
			{ type: CREATE_POST },
			{ type: CLEAR_ERRORS }
		]

		const store = mockStore({ posts: [] })

		return store.dispatch(createPost()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	})

	// getPost
it('should dispatch an action to get a post', () => {
	moxios.wait(() => {
		const request = moxios.requests.mostRecent();
		request.respondWith({
			status: 200
		});
	});

	const expectedActions = [
		{ type: LOADING_UI },
		{ type: SET_POST },
		{ type: STOP_LOADING_UI}
	]

	const store = mockStore({ posts: [] })

	return store.dispatch(getPost()).then(() => {
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