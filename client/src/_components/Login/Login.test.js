import React from 'react';
import { Provider } from 'react-redux';
import Login from './Login';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import myStore from '../../store/_myStore';

const renderWithRedux = () => render(
	<Provider store={myStore}>
		<Login />
	</Provider>
);

it('renders with Redux', () => {
	const {} = renderWithRedux(<Login />);
});

it('renders `GroupGrid` text', () => {
	const {getByText} = renderWithRedux(<Login />);
	expect(screen.getByText(/GroupGrid/)).toBeInTheDocument();
});

afterEach(cleanup);