import React from 'react';
import { Provider } from 'react-redux';
import Post from '../../_components/Post/Post';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import myStore from '../../store/myStore';
import { MemoryRouter } from 'react-router-dom';

const renderWithRedux = ({ children }) => render(
	<Provider store={myStore}>
		{children}
	</Provider>
);

it('renders with Redux', () => {
	const {} = renderWithRedux(
		<MemoryRouter>
			<Post />
		</MemoryRouter>
	);
});

// it('renders `Likes` text', () => {
// 	const {getByText} = renderWithRedux(<Post />);
// 	expect(screen.getByText(/GroupGrid/)).toBeInTheDocument();
// });

// it('renders `Comments` text', () => {
// 	const {getByText} = renderWithRedux(<Post />);
// 	expect(screen.getByText(/GroupGrid/)).toBeInTheDocument();
// });

afterEach(cleanup);