import React from 'react';
import { Provider } from 'react-redux';
import Comments from '../../_components/Comments/Comments';
import { cleanup, render, screen } from '@testing-library/react';
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
			<Comments />
		</MemoryRouter>
	);
});

afterEach(cleanup);