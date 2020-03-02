import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../actions/actionTypes';
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

// helper method for signupUser and loginUser
const setAuthorizationHeader = (token) => {
  const FirebaseIdToken = `Bearer ${token}`;
	localStorage.setItem('FirebaseIdToken', FirebaseIdToken);
	// specify config defaults that will be applied to every request
  axios.defaults.headers.common['Authorization'] = FirebaseIdToken;
};