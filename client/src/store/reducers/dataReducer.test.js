import reducer from './dataReducer';

describe('dataReducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			posts: [],
  		post: {},
  		loading: false
		})
	})
})