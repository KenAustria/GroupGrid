import React from 'react';
import { Provider } from 'react-redux';
import CommentForm from './CommentForm';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import myStore from '../../store/myStore';
import userEvent from '@testing-library/user-event'

const renderWithRedux = () => render(
	<Provider store={myStore}>
		<CommentForm />
	</Provider>
);

it('renders with Redux', () => {
	const {} = renderWithRedux(<CommentForm />);
});

// it('can render an input to comment on post', () => {
// 	const { getByTestId } = renderWithRedux(<CommentForm />);
// 	expect(getByTestId('comment')).toHaveTextContent('');
// });

it('can render a submit button', () => {
	const { getByTestId } = renderWithRedux(<CommentForm />);
	fireEvent.mouseDown(getByTestId('submit-button'));
});

// it('can render a submit text', () => {
// 	const { queryByAltText } = renderWithRedux(<CommentForm />);
// 	expect(queryByAltText(/Submit/)).toBeInTheDocument();
// });

afterEach(cleanup);