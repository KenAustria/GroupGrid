import React, { useState, useEffect } from 'react';
import MyButton from '../MyButton';
// Redux Toolkit
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createPost, clearErrors } from '../../features/data/dataSlice';
// Material-UI
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  submitButton: {
    marginTop: 20,
    float: 'right',
  },
  progressSpinner: {
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%',
  },
};

const CreatePost = ({ classes }) => {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [body, setBody] = useState('');
  const [prevUiErrors] = useState(null);
  const [prevUiLoading] = useState(null);
  const uiErrors = useSelector(state => state.ui.errors);
  const uiLoading = useSelector(state => state.ui.loading);
  const dispatch = useDispatch();
  const prevUiErrors = useRef();

  useEffect(() => {
    if (prevUiErrors !== uiErrors) setErrors(uiErrors);

    if (prevUiErrors !== uiErrors && prevUiLoading !== uiLoading) {
      setOpen(false);
      setErrors({});
      setBody('');
    }
  }, [prevUiErrors, prevUiLoading]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    clearErrors();
    setOpen(false);
    setErrors({});
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(createPost({ body }));
  };

  return (
    <>
      <MyButton title='Create a Post' onClick={handleOpen}>
        <AddIcon color='secondary' data-testid='create-post-icon' />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <MyButton
          title='Cancel'
          onClose={closeHandler}
          tipClassName={classes.closeButton}>
          <CloseIcon color='secondary' data-testid='close-icon' />
        </MyButton>
        <DialogTitle>Create a Post</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name='body'
              type='text'
              label='Share your thoughts..'
              multiline
              rows='3'
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}
              onChange={event => setBody(event.target.value)}
              fullWidth
            />
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.submitButton}
              disabled={uiLoading}>
              Submit
              {uiLoading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(CreatePost);
