import React from 'react';
import { Provider } from 'react-redux';
import LikeButton from '../../_components/LikeButton/LikeButton';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import myStore from '../../store/myStore';

const renderWithRedux = () => render(
	<Provider store={myStore}>
		<LikeButton />
	</Provider>
);

it('renders with Redux', () => {
	const {} = renderWithRedux(<LikeButton />);
});

it('can render a favorite icon', () => {
	const { getByTestId } = renderWithRedux(<LikeButton />);
	expect(getByTestId('favorite-icon')).toHaveTextContent('');
});

afterEach(cleanup);