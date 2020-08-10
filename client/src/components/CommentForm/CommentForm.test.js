import React from 'react';
import { Provider } from 'react-redux';
import CommentForm from './CommentForm';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import myStore from '../../store/myStore';

const renderWithRedux = () => render(
	<Provider store={myStore}>
		<CommentForm />
	</Provider>
);

it('renders with Redux', () => {
	const {} = renderWithRedux(<CommentForm />);
});

afterEach(cleanup);