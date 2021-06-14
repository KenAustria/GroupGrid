import { createSlice } from '@reduxjs/toolkit'
import { setErrors, clearErrors, loadingUi } from '../ui/uiSlice'
import { loadingData, setPosts, setThePost } from '../data/dataSlice'
import axios from 'axios'

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
	notifications: [],
	loading: false
};

// helper method for signupUser and loginUser
const setAuthorizationHeader = token => {
  const FirebaseIdToken = `Bearer ${token}`;
	localStorage.setItem('FirebaseIdToken', FirebaseIdToken);
	// specify config defaults that will be applied to every request
  axios.defaults.headers.common['Authorization'] = FirebaseIdToken;
};

export const loginUser = (userData, history) => dispatch => {
  dispatch(loadingUi());
  return axios
    .post('/login', userData)
    .then(res => {
			setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
			dispatch(setAuthenticated())
      dispatch(clearErrors());
      history.push('/');
    })
    .catch(err => dispatch(setErrors(err.response.data)));
};

export const signupUser = (newUserData, history) => dispatch => {
  dispatch(loadingUi());
  axios
    .post('/signup', newUserData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
			dispatch(setAuthenticated())
      dispatch(clearErrors());
      history.push('/');
    })
    .catch(err => dispatch(setErrors(err.response.data)))
};

export const getUserData = () => dispatch => {
	dispatch(loadingUser());
	return axios
    .get('/user')
    .then(res => dispatch(setUser(res.data)))
    .catch(err => console.log(err))
};

export const logoutUser = () => dispatch => {
	localStorage.removeItem('FirebaseIdToken');
	delete axios.defaults.headers.common['Authorization'];
	dispatch(setUnauthenticated())
	window.location.reload();
};

export const uploadProfileImage = formData => dispatch => {
	dispatch(loadingUser())
	axios
    .post('/user/profileImage', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
}

export const editUserDetails = userDetails => dispatch => {
  dispatch(loadingUser())
  axios
    .post('/user', userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

export const getUserProfile = userHandle => dispatch => {
	dispatch(loadingData())
	axios
		.get(`/user/${userHandle}`)
		.then(res => dispatch(setPosts(res.data.posts)))
		.catch(err => dispatch(setThePost(null)))
}

export const markNotificationsRead = notificationIds => dispatch => {
	axios
		.post(`/notifications`, notificationIds)
		.then(res => dispatch(markNotificationsRead()))
		.catch(err => console.log(err))
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
			// state.authenticated = true
			// state.loading = false
			// return action.payload
			return {
				authenticated: true,
				loading: false,
				...action.payload
			}
		},
		loadingUser(state, action) {
			state.loading = true
		},
		likePost(state, action) {
			return {
				...state,
					likes: [
						...state.likes,
							{
								userHandle: state.credentials.handle,
								postId: action.payload.postId
							}
					]
			};
		},
		unlikePost(state, action) {
			return {
				...state,
				likes: state.likes.filter(
					(like) => like.postId !== action.payload.postId
				)
			};
		},
		markTheNotificationsRead(state, action) {
			state.notifications.forEach(notification => (notification.read = true));
			return state
		}
  },
})

export const { setAuthenticated, setUnauthenticated, setUser, loadingUser, likePost, unlikePost, markTheNotificationsRead } = usersSlice.actions

export default usersSlice.reducer