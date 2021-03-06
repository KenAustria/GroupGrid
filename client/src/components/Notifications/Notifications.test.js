import React from 'react';
import { Provider } from 'react-redux';
import Notifications from '../../_components/Notifications/Notifications';
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

it('can render an icon button', () => {
	const { getByTestId } = renderWithRedux(<Notifications />);
	expect(getByTestId('icon-button')).toHaveTextContent('');
});

it('can render a menu', () => {
	const { getByTestId } = renderWithRedux(<Notifications />);
	expect(getByTestId('menu')).toHaveTextContent('');
});

afterEach(cleanup);