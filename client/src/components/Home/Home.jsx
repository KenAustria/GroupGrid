import React, { useEffect } from 'react';
import Profile from '../Profile/';
import Post from '../Post';
// Redux Toolkit
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../features/data/dataSlice';
// Libraries
import { BrowserRouter as Router } from 'react-router-dom';
// Material-UI
import Grid from '@material-ui/core/Grid';

const Home = () => {
  const posts = useSelector(state => state.data.posts);
  const loading = useSelector(state => state.data.loading);
  const dispatch = useDispatch();

  useEffect(() => dispatch(getPosts()));

  let currentPosts = loading ? (
    <p>Loading..</p>
  ) : (
    posts.map(post => <Post key={post.postId} post={post} />)
  );

  return (
    <Router>
      <Grid container spacing={2}>
        <Grid item sm={4} xl={12}>
          <Profile />
        </Grid>
        <Grid item sm={8} xl={12}>
          {currentPosts}
        </Grid>
      </Grid>
    </Router>
  );
};

export default Home;
