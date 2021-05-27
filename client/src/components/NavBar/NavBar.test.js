import React from 'react';
import { Provider } from 'react-redux';
import NavBar from '../../_components/NavBar/NavBar';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import myStore from '../../store/myStore';

const renderWithRedux = () => render(
	<Provider store={myStore}>
		<NavBar />
	</Provider>
);

it('renders with Redux', () => {
	const {} = renderWithRedux(<NavBar />);
});

it('renders `GroupGrid` text', () => {
	const {getByText} = renderWithRedux(<NavBar />);
	expect(screen.getByText(/GroupGrid/)).toBeInTheDocument();
});

it('renders `Login` text', () => {
	const {getByText} = renderWithRedux(<NavBar />);
	expect(screen.getByText(/Login/)).toBeInTheDocument();
});

it('renders `Signup` text', () => {
	const {getByText} = renderWithRedux(<NavBar />);
	expect(screen.getByText(/Signup/)).toBeInTheDocument();
});

afterEach(cleanup);