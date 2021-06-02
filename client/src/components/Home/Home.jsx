import React, { useEffect } from 'react';
import Profile from '../Profile/';
import Post from '../Post';
import PropTypes from 'prop-types';
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

  useEffect(() => {
    dispatch(getPosts());
    // const asyncFetchData = async () => {
    //   await dispatch(getPosts());
    // };

    // asyncFetchData();
  }, []);

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

Home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Home;
