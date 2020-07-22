import reducer from './uiReducer';

describe('uiReducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			loading: false,
  		errors: null
		})
	})
})