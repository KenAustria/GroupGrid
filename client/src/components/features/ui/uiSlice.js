import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  errors: null
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setErrors(state, action) {
			state.loading = false
			state.errors = action.payload
		},
		clearErrors(state) {
			state.loading = false
			state.errors = null
		},
		loadingUi(state) {
			state.loading = true
		},
		stopLoadingUi(state) {
			state.loading = false
		}
  },
})

export const { setErrors, clearErrors, loadingUi, stopLoadingUi } = uiSlice.actions

export default uiSlice.reducer