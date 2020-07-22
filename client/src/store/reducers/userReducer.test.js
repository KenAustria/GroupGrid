import reducer from './userReducer';

describe('userReducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			authenticated: false,
  		credentials: {},
  		likes: [],
			notifications: [],
			loading: false
		})
	})
})