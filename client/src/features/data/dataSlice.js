import { createSlice } from '@reduxjs/toolkit'
import { loadingUi, setErrors, stopLoadingUi } from '../ui/uiSlice'
import axios from 'axios'

const initialState = {
  posts: [],
  post: {},
	loading: false
};

export const getPosts = () => dispatch => {
	dispatch(loadingData())
  return axios
    .get(`/posts`)
    .then(res => dispatch(setPosts(res.data)))
		.catch(err => dispatch(setPosts([])))
};

export const likePost = postId => dispatch => {
  return axios
    .get(`/post/${postId}/like`)
    .then(res => dispatch(likeThePost(res.data)))
    .catch(err => console.log(err));
};

export const unlikePost = postId => dispatch => {
  return axios
    .get(`/post/${postId}/unlike`)
    .then(res => dispatch(unlikeThePost(res.data)))
    .catch(err => console.log(err));
};

export const deletePost = postId => dispatch => {
  return axios
    .delete(`/post/${postId}`)
    .then(() => dispatch(deletePost(postId)))
    .catch(err => console.log(err));
};

export const createPost = newPost => dispatch => {
	dispatch(loadingUi())
  return axios
    .post('/post', newPost)
    .then(res => {
			dispatch(createPost(res.data))
			dispatch(clearErrors());
			window.location.reload();
    })
    .catch(err => dispatch(setErrors(err.response.data)))
};

export const getPost = postId => dispatch => {
	dispatch(loadingUi())
	return axios
		.get(`/post/${postId}`)
		.then(res => {
			dispatch(setThePost(res.data))
			dispatch(stopLoadingUi())
		})
		.catch(err => console.log(err))
};

export const submitComment = (postId, commentData) => dispatch => {
  return axios
    .post(`/post/${postId}/comment`, commentData)
    .then(res => {
			dispatch(submitComment(res.data))
      dispatch(clearErrors());
    })
    .catch(err => dispatch(setErrors(err.response.data)))
};

export const clearErrors = () => dispatch => dispatch(clearErrors())

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
		loadingData(state, action) {
			state.loading = true
		},
		setPosts(state, action) {
			state.posts = action.payload
			state.loading = false
		},
    likeThePost(state, action) {
			let index = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
			);
			state.posts[index] = action.payload;
			if (state.post.postId === action.payload.postId) {
				state.post = action.payload
			}
			return state
		},
		unlikeThePost(state, action) {
			let index = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
			);
			state.posts[index] = action.payload;
			if (state.post.postId === action.payload.postId) {
				state.post = action.payload
			}
			return state
		},
		deleteThePost(state, action) {
			state.posts = state.posts.filter(post => post.postId !== action.payload );
		},
		createThePost(state, action) {
			state.posts = action.payload
		},
		setThePost(state, action) {
			state.post = action.payload
		},
		submitTheComment(state, action) {
			state.post.comments = action.payload
		}
  },
})

export const { loadingData, setPosts, likeThePost, unlikeThePost, deleteThePost, createThePost, setThePost, submitTheComment } = dataSlice.actions

export default dataSlice.reducer