import React from 'react';
import { Provider } from 'react-redux';
import Signup from './Signup';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import myStore from '../../store/myStore';

const renderWithRedux = () => render(
	<Provider store={myStore}>
		<Signup />
	</Provider>
);

it('renders with Redux', () => {
	const {} = renderWithRedux(<Signup />);
});

it('renders `Signup` text', () => {
	const {getByText} = renderWithRedux(<Signup />);
	expect(screen.getByText(/Signup/)).toBeInTheDocument();
});

afterEach(cleanup);