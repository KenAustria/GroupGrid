import React from 'react';
import DeletePost from '../DeletePost';
import PostDialog from '../PostDialog';
import LikeButton from '../LikeButton';
import MyButton from '../../utils/MyButton';
// import PropTypes from 'prop-types';
// Redux Toolkit
import { useSelector } from 'react-redux';
// Libraries
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import relativeTime from 'dayjs/plugin/relativeTime';
// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ChatIcon from '@material-ui/icons/Chat';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: '20px',
  },
  content: {
    padding: '25px',
    objectFit: 'cover',
  },
  avatar: {
    width: 70,
    height: 70,
  },
};

const Post = ({ classes, post }) => {
  const {
    body,
    createdAt,
    profileImage,
    userHandle,
    postId,
    likeCount,
    commentCount,
  } = post;
  const authenticated = useSelector(state => state.users.authenticated);
  const credentials = useSelector(state => state.users.credentials);
  dayjs.extend(relativeTime);

  const deleteButton =
    authenticated && userHandle === credentials.handle ? (
      <DeletePost postId={postId} />
    ) : null;

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <CardHeader
          avatar={
            <Avatar
              alt='Profile Image'
              src={profileImage}
              className={classes.avatar}
            />
          }
          title={userHandle}
          subheader={dayjs(createdAt).fromNow()}
          component={Link}
          to={`/users/${userHandle}`}
        />
        <Typography variant='body1'>{body}</Typography>
        <LikeButton postId={postId} />
        <span>{likeCount} Likes</span>
        <MyButton title='Comments'>
          <ChatIcon color='primary' />
        </MyButton>
        <span>{commentCount} Comments</span>
        <PostDialog postId={postId} userHandle={userHandle} />
        {deleteButton}
      </CardContent>
    </Card>
  );
};

// Post.propTypes = {
//   classes: PropTypes.object.isRequired,
//   post: PropTypes.object.isRequired,
//   authenticated: PropTypes.bool.isRequired,
//   credentials: PropTypes.object.isRequired,
// };

export default withStyles(styles)(Post);
