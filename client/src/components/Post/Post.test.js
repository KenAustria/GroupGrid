import React from 'react';
import { Provider } from 'react-redux';
import Post from './Post';
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
			<Post />
		</MemoryRouter>
	);
});

afterEach(cleanup);