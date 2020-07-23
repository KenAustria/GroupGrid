import reducer from './uiReducer';
import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, STOP_LOADING_UI } from '../actions/actionTypes';

describe('uiReducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			loading: false,
  		errors: null
		})
	})

	// SET_ERRORS

	it('should clear errors', () => {
		expect(reducer({
			loading: false,
  		errors: null
		}, {
			type: CLEAR_ERRORS,
			loading: false,
  		errors: null
		})).toEqual({
			loading: false,
  		errors: null
		});
	})

	it('should set ui', () => {
		expect(reducer({
			loading: false,
  		errors: null
		}, {
			type: LOADING_UI,
			loading: true,
  		errors: null
		})).toEqual({
			loading: true,
  		errors: null
		});
	})

	it('should set ui', () => {
		expect(reducer({
			loading: false,
  		errors: null
		}, {
			type: STOP_LOADING_UI,
			loading: false,
  		errors: null
		})).toEqual({
			loading: false,
  		errors: null
		});
	})
})