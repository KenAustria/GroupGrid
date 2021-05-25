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

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch(loadingUi());
  axios
    .post('/signup', newUserData)
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

export const logoutUser = () => (dispatch) => {
	localStorage.removeItem('FirebaseIdToken');
	// remove Authorization header from axios defaults
	delete axios.defaults.headers.common['Authorization'];
	dispatch(setAuthenticated())
};

export const uploadProfileImage = (formData) => (dispatch) => {
	dispatch(loadingUser())
	axios
    .post('/user/profileImage', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
}

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
		},
		loadingUser(state, action) {
			state.loading = true
		}
  },
})

export const { setAuthenticated, setUnauthenticated, setUser, loadingUser } = usersSlice.actions

export default usersSlice.reducer