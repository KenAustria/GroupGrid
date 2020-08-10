import React from 'react';
import { Provider } from 'react-redux';
import DeletePost from './DeletePost';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import myStore from '../../store/myStore';

const renderWithRedux = () => render(
	<Provider store={myStore}>
		<DeletePost />
	</Provider>
);

it('renders with Redux', () => {
	const {} = renderWithRedux(<DeletePost />);
});

afterEach(cleanup);