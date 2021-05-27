import React, { useState, useEffect } from 'react';
import LikeButton from '../LikeButton';
import Comments from '../Comments';
import CommentForm from '../CommentForm';
import MyButton from '../MyButton';
// Redux Toolkit
import { useSelector } from 'react-redux';
import { getPost, clearErrors } from '../../features/data/dataSlice';
// Libraries
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// Material-UI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = () => ({
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  invisibleSeparator: {
    border: 'none',
    margin: 4,
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20,
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  dialogContent: {
    padding: 20,
  },
  expandButton: {
    position: 'absolute',
    left: '90%',
  },
});

const PostDialog = ({ postId, userHandle, openDialog }) => {
  const [open, setOpen] = useState(false);
  const [oldUrl, setOldUrl] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [getPostData, setGetPostData] = useState(false);
  const [prevUserNotificationId] = useState(null);
  const dispatch = useDispatch();
  const post = useSelector(state => state.data.post);
  const ui = useSelector(state => state.ui);
  const user = useSelector(state => state.user.notifications);

  useEffect(() => {
    if (openDialog && !getPostData) {
      setGetPostData(true);
      handleOpen();
    } else if (openDialog && user.notificationId !== prevUserNotificationId) {
      handleOpen();
    }

    if (openDialog && !getPostData) {
      setGetPostData(true);
      handleOpen();
    }
  }, [openDialog, getPostData, prevUserNotificationId]);

  const handleOpen = () => {
    setOldUrl(window.location.pathname);
    setNewUrl(`/users/${userHandle}/post/${postId}`);

    // case if pastes url, therefore no previous url path
    if (oldUrl === newUrl) setOldUrl(`/users/${userHandle}`);

    window.history.pushState(null, null, newUrl);
    // this.setState({ open: true, oldUrl, newUrl });
    setOpen(true);
    dispatch(getPost(postId));
  };

  const handleClose = () => {
    // revert back to oldUrl
    window.history.pushState(null, null, oldUrl);
    setOpen(false);
    setGetPostData(false);
    dispatch(clearErrors());
  };

  const postDialog = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={16}>
      <Grid item sm={5}>
        <img
          src={profileImage}
          alt='Profile'
          className={classes.profileImage}
        />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color='primary'
          variant='h5'
          to={`/users/${userHandle}`}>
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant='body2' color='textSecondary'>
          {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant='body1'>{body}</Typography>
        <LikeButton postId={postId} />
        <span>{likeCount} Likes</span>
        <MyButton
          title='Comments'
          onClick={handleOpen}
          className={classes.expandButton}>
          <ChatIcon color='primary' />
        </MyButton>
        <span>{commentCount} Comments</span>
      </Grid>
      <CommentForm postId={postId} />
      <Comments comments={comments} />
    </Grid>
  );

  return (
    <>
      <MyButton
        title='Expand Post'
        onClick={handleOpen}
        className={classes.expandButton}>
        <UnfoldMore color='primary' data-testid='unfold-icon' />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogContent className={classes.dialogContent}>
          <MyButton title='Close' onClick={handleClose}>
            <CloseIcon />
          </MyButton>
          {postDialog}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(PostDialog);
