import React from 'react';
import { Provider } from 'react-redux';
import CreatePost from './CreatePost';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import myStore from '../../store/myStore';

const renderWithRedux = () => render(
	<Provider store={myStore}>
		<CreatePost />
	</Provider>
);

it('renders with Redux', () => {
	const {} = renderWithRedux(<CreatePost />);
});

afterEach(cleanup);