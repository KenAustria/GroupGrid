import React from 'react';
import { Provider } from 'react-redux';
import MyButton from './MyButton';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import myStore from '../../store/myStore';

const renderWithRedux = () => render(
	<Provider store={myStore}>
		<MyButton />
	</Provider>
);

it('renders with Redux', () => {
	const {} = renderWithRedux(<MyButton />);
});

afterEach(cleanup);