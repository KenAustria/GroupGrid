import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER } from '../actions/actionTypes';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/login', userData)
    .then((res) => {
      const FirebaseIdToken = `Bearer ${res.data.token}`;
      localStorage.setItem('FirebaseIdToken', FirebaseIdToken);
			// specify config defaults that will be applied to every request
			axios.defaults.headers.common['Authorization'] = FirebaseIdToken;
			setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/signup', newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getUserData = () => (dispatch) => {
	dispatch({ type: LOADING_USER });
	// send get request, if response exist, then dispatch SET_USER action
	axios
    .get('/user')
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};

export const logoutUser = () => (dispatch) => {
	// remove token from storage
	localStorage.removeItem('FirebaseIdToken');
	// remove Authorization header from axios defaults
	delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};

// helper method for signupUser and loginUser
const setAuthorizationHeader = (token) => {
  const FirebaseIdToken = `Bearer ${token}`;
	localStorage.setItem('FirebaseIdToken', FirebaseIdToken);
	// specify config defaults that will be applied to every request
  axios.defaults.headers.common['Authorization'] = FirebaseIdToken;
};

export const uploadProfileImage = (formData) => (dispatch) => {
	dispatch({ type: LOADING_USER });
	axios
    .post('/user/profileImage', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
}

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post('/user', userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};