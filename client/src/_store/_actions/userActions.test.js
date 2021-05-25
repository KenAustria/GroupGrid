import moxios from 'moxios';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
	loginUser,
	signupUser,
	getUserData,
	deletePost,
	logoutUser,
	uploadProfileImage,
	editUserDetails,
	getUserProfile,
	markNotificationsRead
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
	MARK_NOTIFICATIONS_READ
} from '../actions/actionTypes';

describe('dataActions', () => {
	const middlewares = [thunk];
	const mockStore = configureMockStore(middlewares);

	beforeEach(() => {
		moxios.install();
	});

	// ASYNC ACTION
	it('should dispatch an action to login a user', () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200
			});
		});

		const expectedActions = [
			{ type: LOADING_UI },
			{ type: LOADING_USER },
			{ type: SET_USER },
			{ type: CLEAR_ERRORS }
		]

		const store = mockStore({ posts: {} })

		return store.dispatch(loginUser()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	})

	afterEach(() => {
		moxios.uninstall();
	})
})