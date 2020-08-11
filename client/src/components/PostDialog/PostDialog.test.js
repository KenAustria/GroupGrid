import React from 'react';
import { Provider } from 'react-redux';
import PostDialog from './PostDialog';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import myStore from '../../store/myStore';

const renderWithRedux = () => render(
	<Provider store={myStore}>
		<PostDialog />
	</Provider>
);

it('renders with Redux', () => {
	const {} = renderWithRedux(<PostDialog />);
});

afterEach(cleanup);