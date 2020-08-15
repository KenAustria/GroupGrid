import React from 'react';
import { Provider } from 'react-redux';
import Login from './Login';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import myStore from '../../store/myStore';

const renderWithRedux = () => render(
	<Provider store={myStore}>
		<Login />
	</Provider>
);

it('renders with Redux', () => {
	const {} = renderWithRedux(<Login />);
});

afterEach(cleanup);