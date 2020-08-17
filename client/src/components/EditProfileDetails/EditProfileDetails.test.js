import React from 'react';
import { Provider } from 'react-redux';
import EditProfileDetails from './EditProfileDetails';
import { cleanup, render, screen } from '@testing-library/react';
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

afterEach(cleanup);