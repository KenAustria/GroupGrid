import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  posts: [],
  post: {},
	loading: false
};

export const getPosts = () => (dispatch) => {
	dispatch(loadingData())
  return axios
    .get(`/posts`)
    .then(res => {
			dispatch(setPosts(res.data))
    })
		.catch(err => {
			dispatch(setPosts(payload = []))
		})
};

export const likePost = (postId) => (dispatch) => {
  return axios
    .get(`/post/${postId}/like`)
    .then(res => {
			dispatch(likeThePost(res.data))
    })
    .catch(err => console.log(err));
};

export const unlikePost = (postId) => (dispatch) => {
  return axios
    .get(`/post/${postId}/unlike`)
    .then(res => {
			dispatch(unlikeThePost(res.data))
    })
    .catch(err => console.log(err));
};

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
		}
  },
})

export const { likePost, unlikePost } = dataSlice.actions

export default dataSlice.reducer