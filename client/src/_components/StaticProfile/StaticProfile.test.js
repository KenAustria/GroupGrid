import React from 'react';
import { Provider } from 'react-redux';
import StaticProfile from './StaticProfile';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import myStore from '../../store/myStore';
import { MemoryRouter } from 'react-router-dom';

const renderWithRedux = ({ children }) => render(
	<Provider store={myStore}>
		{children}
	</Provider>
);

it('renders with Redux', () => {
	const {} = renderWithRedux(
		<MemoryRouter>
			<StaticProfile />
		</MemoryRouter>
	);
});

afterEach(cleanup);