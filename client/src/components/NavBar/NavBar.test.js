import React from 'react';
import { Provider } from 'react-redux';
import NavBar from './NavBar';
import { render } from '@testing-library/react';
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
