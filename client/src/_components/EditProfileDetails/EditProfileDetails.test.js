import React from 'react';
import { Provider } from 'react-redux';
import EditProfileDetails from './EditProfileDetails';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import myStore from '../../store/myStore';

const renderWithRedux = () => render(
	<Provider store={myStore}>
		<EditProfileDetails />
	</Provider>
);

it('renders with Redux', () => {
	const {} = renderWithRedux(<EditProfileDetails />);
});

it('can render an edit icon', () => {
	const { getByTestId } = renderWithRedux(<EditProfileDetails />);
	expect(getByTestId('edit-icon')).toHaveTextContent('');
});

// it('renders `Cancel` text', () => {
// 	const {getByText} = renderWithRedux(<EditProfileDetails />);
// 	expect(screen.getByText(/Cancel/)).toBeInTheDocument();
// });

// it('renders `Save` text', () => {
// 	const {getByText} = renderWithRedux(<EditProfileDetails />);
// 	expect(screen.getByText(/Save/)).toBeInTheDocument();
// });

// it('should fire event for cancel button', () => {
// 	const { getByTestId } = renderWithRedux(<EditProfileDetails />);
// 	const rightClick = { button: 2 }
// 	fireEvent.click(getByTestId('cancel-button'), rightClick)
// });

afterEach(cleanup);