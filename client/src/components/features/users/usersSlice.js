import { createSlice } from '@reduxjs/toolkit'
import { setErrors, clearErrors, loadingUi } from "../ui/uiSlice"
import axios from "axios"

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
	notifications: [],
	loading: false
};

const setAuthorizationHeader = (token) => {
  const FirebaseIdToken = `Bearer ${token}`;
	localStorage.setItem('FirebaseIdToken', FirebaseIdToken);
  axios.defaults.headers.common['Authorization'] = FirebaseIdToken;
};

export const loginUser = (userData, history) => (dispatch) => {
  dispatch(loadingUi());
  return axios
    .post('/login', userData)
    .then((res) => {
			setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch(clearErrors);
      history.push('/');
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

export const getUserData = () => (dispatch) => {
	dispatch(loadingUi());
	return axios
    .get('/user')
    .then((res) => {
			dispatch(setUser(res.data))
    })
    .catch((err) => console.log(err));
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthenticated(state, action) {
			state.authenticated = true
		},
		setUnauthenticated(state, action) {
			state = initialState
		},
		setUser(state, action) {
			state.authenticated = true
			state.loading = false
			return action.payload
		}
  },
})

export const { setAuthenticated, setUnauthenticated, setUser } = usersSlice.actions

export default usersSlice.reducer