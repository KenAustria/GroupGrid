import React from 'react';
import { Provider } from 'react-redux';
import Profile from './Profile';
import { cleanup, render } from '@testing-library/react';
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

afterEach(cleanup);