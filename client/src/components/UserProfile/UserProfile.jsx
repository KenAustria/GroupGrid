import React, { useState, useEffect } from 'react';
import Post from '../Post';
import StaticProfile from '../StaticProfile';
// import PropTypes from 'prop-types';
// Redux Toolkit
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUserProfile } from '../../features/users/usersSlice';
// Libraries
import axios from 'axios';
import { useParams } from 'react-router-dom';
// Material-UI
import Grid from '@material-ui/core/Grid';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [postIdParam, setPostIdParam] = useState(null);
  const { handle, postId } = useParams();
  const posts = useSelector(state => state.data.posts);
  const loading = useSelector(state => state.data.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (postId) setPostIdParam(postId);
    dispatch(getUserProfile(handle));

    axios(`/user/${handle}`)
      .then(res => setProfile(res.data.user))
      .catch(err => console.log(err));
  }, [dispatch, handle, postId]);

  const userProfile = loading ? (
    <p>Loading data...</p>
  ) : posts === null ? ( // if not loading, but user does not have any posts
    <p>No posts from this user</p>
  ) : !postIdParam ? (
    posts.map(post => <Post key={post.postId} post={post} />) // if not loading && posts aren't empty && postId IS null, do nothing
  ) : (
    posts.map(post => {
      // if not loading && posts aren't empty && postId IS NOT null
      if (post.postId !== postIdParam)
        // if the post isn't the one we're looking for, do nothing
        return <Post key={post.postId} post={post} />;
      else return <Post key={post.postId} post={post} />;
    })
  );

  return (
    <Grid container spacing={2}>
      <Grid item sm={4} xs={12}>
        {profile === null ? (
          <p>Loading profile...</p>
        ) : (
          <StaticProfile userProfile={profile} />
        )}
      </Grid>
      <Grid item sm={8} xs={12}>
        {userProfile}
      </Grid>
    </Grid>
  );
};

// UserProfile.propTypes = {
//   posts: PropTypes.array.isRequired,
//   loading: PropTypes.bool.isRequired,
//   getUserProfile: PropTypes.func.isRequired,
// };

export default UserProfile;
