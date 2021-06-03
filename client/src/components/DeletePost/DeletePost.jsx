import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// Redux Toolkit
import { useDispatch } from 'react-redux';
import { deletePost } from '../../features/data/dataSlice';
// Material-UI
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const styles = {
  deleteButton: {
    position: 'absolute',
    left: '80%',
  },
};

const DeletePost = ({ classes, postId }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeletePost = () => {
    dispatch(deletePost(postId));
    setOpen(false);
  };

  return (
    <>
      <Tooltip title='Delete a Post'>
        <IconButton onClick={handleOpen} className={classes.deleteButton}>
          <DeleteOutline color='secondary' data-testid='delete-icon' />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleDeletePost} color='secondary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// DeletePost.propTypes = {
//   classes: PropTypes.object.isRequired,
//   deletePost: PropTypes.func.isRequired,
//   postId: PropTypes.string.isRequired,
// };

export default withStyles(styles)(DeletePost);
