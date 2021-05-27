import React from 'react';
import { Provider } from 'react-redux';
import AuthRoute from '../../_components/AuthRoute/AuthRoute';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import myStore from '../../store/myStore';

const renderWithRedux = ({ children }) => render(
	<Provider store={myStore}>
		{children}
	</Provider>
);

it('renders with Redux', () => {
	const {} = renderWithRedux(
		<MemoryRouter>
			<AuthRoute />
		</MemoryRouter>
	);
});
