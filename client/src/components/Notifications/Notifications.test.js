import React from 'react';
import { Provider } from 'react-redux';
import Notifications from './Notifications';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import myStore from '../../store/myStore';

const renderWithRedux = () => render(
	<Provider store={myStore}>
		<Notifications />
	</Provider>
);

it('renders with Redux', () => {
	const {} = renderWithRedux(<Notifications />);
});

afterEach(cleanup);