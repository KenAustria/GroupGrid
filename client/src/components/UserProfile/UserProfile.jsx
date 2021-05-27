import React, { useState, useEffect } from 'react'
import Post from '../Post';
import StaticProfile from '../StaticProfile';
// Redux Toolkit
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUserProfile } from '../../features/users/usersSlice';
// Libraries
import axios from 'axios';
// Material-UI
import Grid from '@material-ui/core/Grid';

const UserProfile = () => {
  const [profile, setProfile] = useState(null)
  const [postIdParam, setPostIdParam] = useState(null)
  const posts = useSelector((state) => state.data.posts);
  const loading = useSelector((state) => state.data.loading);
  const dispatch = useDispatch();

  useEffect(async () => {
    const handle = props.match.params.handle;
		const postId = props.match.params.postId;
    if (postId) setPostIdParam(postId)
		dispatch(getUserProfile(handle))

    const result = await axios(`/user/${handle}`)
    .then(res => setProfile(res.data.user))
    .catch(err => console.log(err));

    setProfile(result.data);
  });

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.match !== this.props.match) {
      const postId = nextProps.match.params.postId;
      if (postId)
        this.setState({ postIdParam: postId, openDialog: true });
    }
	}

  const userProfile = loading ? (
    <p>Loading data...</p>
  ) : posts === null ? ( // if not loading, but user does not have any posts
    <p>No posts from this user</p>
  ) : !postIdParam ? (
    posts.map(post => <Post key={post.postId} post={post} />) // if not loading && posts aren't empty && postIdParam IS null, do nothing
  ) : (
    posts.map(post => { // if not loading && posts aren't empty && postIdParam IS NOT null
      if (post.postId !== postIdParam) // if the post isn't the one we're looking for, do nothing
        return <Post key={post.postId} post={post} />;
      else return <Post key={post.postId} post={post} openDialog={this.openDialogHandler} />; // we find the post we want opened so we pass it the `openDialog` prop
    })
  );

  return (
    <Grid container spacing={2}>
      <Grid item sm={4} xs={12}>
        {profile === null ? (
          <p>Loading profile...</p>
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
      <Grid item sm={8} xs={12}>
        {userProfile}
      </Grid>
    </Grid>
  );
}

export default UserProfile