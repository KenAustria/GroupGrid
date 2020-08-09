import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import DeletePost from './DeletePost';
import { DELETE_POST } from '../../store/actions/actionTypes';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

const initialState = {
  posts: [],
  post: {},
  loading: false
};

function reducer(state = initialState, action) {
  switch (action.type) {
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(post => post.postId !== action.payload ) };
    default:
      return state;
  }
}

function renderWithRedux(
	component,
	{initialState, store = createStore(reducer, initialState)} = {}
) {
	return {
		...render(<Provider store={store}>{component}</Provider>)
	};
}

it('renders with Redux', () => {
	const {getByTestId, getByText} = renderWithRedux(<DeletePost />);
});