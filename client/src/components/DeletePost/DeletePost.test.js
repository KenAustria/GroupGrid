import React from 'react';
import { Provider } from 'react-redux';
import DeletePost from '../../_components/DeletePost/DeletePost';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import myStore from '../../store/myStore';

const renderWithRedux = () => render(
	<Provider store={myStore}>
		<DeletePost />
	</Provider>
);

it('renders with Redux', () => {
	const {} = renderWithRedux(<DeletePost />);
});

it('can render a delete icon', () => {
	const { getByTestId } = renderWithRedux(<DeletePost />);
	expect(getByTestId('delete-icon')).toHaveTextContent('');
});

it('can render a title', () => {
	const { getByTitle } = renderWithRedux(<DeletePost />);
	expect(getByTitle('Delete a Post')).toBeInTheDocument();
});

afterEach(cleanup);