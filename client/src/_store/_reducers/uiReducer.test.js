import reducer from './uiReducer';
import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, STOP_LOADING_UI } from '../actions/actionTypes';

const initialState = {
	loading: false,
  errors: null
}

describe('uiReducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState)
	})

	it('should set errors', () => {
		expect(reducer(initialState, {
			type: SET_ERRORS,
			loading: false,
  		errors: action.payload
		})).toEqual({
			loading: false,
  		errors: null
		});
	})

	it('should clear errors', () => {
		expect(reducer(initialState, {
			type: CLEAR_ERRORS,
			loading: false,
  		errors: null
		})).toEqual({
			loading: false,
  		errors: null
		});
	})

	it('should set ui', () => {
		expect(reducer(initialState, {
			type: LOADING_UI,
			loading: true,
  		errors: null
		})).toEqual({
			loading: true,
  		errors: null
		});
	})

	it('should not set ui', () => {
		expect(reducer(initialState, {
			type: STOP_LOADING_UI,
			loading: false,
  		errors: null
		})).toEqual({
			loading: false,
  		errors: null
		});
	})
})