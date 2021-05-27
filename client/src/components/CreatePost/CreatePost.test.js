import React from 'react';
import { Provider } from 'react-redux';
import CreatePost from '../../_components/CreatePost/CreatePost';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import myStore from '../../store/myStore';

const renderWithRedux = () => render(
	<Provider store={myStore}>
		<CreatePost />
	</Provider>
);

it('renders with Redux', () => {
	const {} = renderWithRedux(<CreatePost />);
});

it('can render a create icon', () => {
	const { getByTestId } = renderWithRedux(<CreatePost />);
	expect(getByTestId('create-post-icon')).toHaveTextContent('');
});

// it('can render a close icon', () => {
// 	const { queryByTestId } = renderWithRedux(<CreatePost />);
// 	expect(queryByTestId('close-icon')).toBeNull();
// });

it('can render a title', () => {
	const { getByTitle } = renderWithRedux(<CreatePost />);
	expect(getByTitle(/Create a Post/)).toBeInTheDocument();
});

// TextField
// it('can render a share you thoughts label', () => {
// 	const { queryByTitle } = renderWithRedux(<CreatePost />);
// 	expect(queryByTitle(/Hi/)).toBeNull();
// });

// Submit Button

afterEach(cleanup);