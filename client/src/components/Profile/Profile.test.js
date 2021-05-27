import React from 'react';
import { Provider } from 'react-redux';
import Profile from '../../_components/Profile/Profile';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import myStore from '../../store/myStore';

const renderWithRedux = () => render(
	<Provider store={myStore}>
		<Profile />
	</Provider>
);

it('renders with Redux', () => {
	const {} = renderWithRedux(<Profile />);
});

it('renders `No profile found, please login again` text', () => {
	const {getByText} = renderWithRedux(<Profile />);
	expect(screen.getByText(/No profile found, please login again/)).toBeInTheDocument();
});

it('renders `Login` text', () => {
	const {getByText} = renderWithRedux(<Profile />);
	expect(screen.getByText(/Login/)).toBeInTheDocument();
});

it('renders `Signup` text', () => {
	const {getByText} = renderWithRedux(<Profile />);
	expect(screen.getByText(/Signup/)).toBeInTheDocument();
});

afterEach(cleanup);