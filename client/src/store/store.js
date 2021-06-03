import { configureStore } from '@reduxjs/toolkit'
import usersReducer from "../features/users/usersSlice"
import dataReducer from "../features/data/dataSlice"
import uiReducer from "../features/ui/uiSlice"

export default configureStore({
  reducer: {
		users: usersReducer,
		data: dataReducer,
		ui: uiReducer
	}
})
