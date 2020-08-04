import { 
	SET_POSTS,
	LOADING_DATA,
	LOADING_UI,
	LIKE_POST,
	UNLIKE_POST,
	DELETE_POST,
	CREATE_POST,
	SET_ERRORS,
	CLEAR_ERRORS,
	STOP_LOADING_UI,
	SET_POST,
	SUBMIT_COMMENT } from '../actions/actionTypes';
import axios from 'axios';

export const getPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  return axios
    .get(`/posts`)
    .then(res => {
      dispatch({
        type: SET_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_POSTS,
        payload: []
      });
    });
};

export const likePost = (postId) => (dispatch) => {
  return axios
    .get(`/post/${postId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_POST,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const unlikePost = (postId) => (dispatch) => {
  return axios
    .get(`/post/${postId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_POST,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const deletePost = (postId) => (dispatch) => {
  return axios
    .delete(`/post/${postId}`)
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId });
    })
    .catch((err) => console.log(err));
};

export const createPost = (newPost) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  return axios
    .post('/post', newPost)
    .then(res => {
      dispatch({
        type: CREATE_POST,
        payload: res.data
			});
			dispatch(clearErrors());
			window.location.reload();
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getPost = (postId) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	return axios
		.get(`/post/${postId}`)
		.then(res => {
			dispatch({
				type: SET_POST,
				payload: res.data
			})
			dispatch({ type: STOP_LOADING_UI });
		})
		.catch(err => {
			console.log(err);
		});
};

export const submitComment = (postId, commentData) => (dispatch) => {
  axios
    .post(`/post/${postId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};