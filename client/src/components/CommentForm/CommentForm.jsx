import React, { useState } from 'react';
// Redux Toolkit
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { submitComment } from '../../features/data/dataSlice';
// Material-UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  textField: {
    margin: '10px auto 10px auto',
  },
  button: {
    marginTop: 20,
    float: 'right',
  },
};

const CommentForm = ({ classes }) => {
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});
  const [prevUiErrors, setPrevUiErrors] = useState(null);
  const uiErrors = useSelector(state => state.ui.errors);
  const authenticated = useSelector(state => state.user.authenticated);
  const dispatch = useDispatch();

  if (uiErrors !== prevUiErrors) {
    setPrevUiErrors(uiErrors);
  }

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(submitComment(postId, { body }));
    setBody('');
  };

  const commentForm = authenticated ? (
    <Grid item sm={12} style={{ textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name='body'
          type='text'
          label='Comment on Post'
          error={errors.comment ? true : false}
          helperText={errors.comment}
          value={body}
          onChange={event => setBody(event.target.value)}
          fullWidth
          className={classes.textField}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          className={classes.button}
          alt='submit'>
          Submit
        </Button>
      </form>
    </Grid>
  ) : null;

  return commentForm;
};

export default withStyles(styles)(CommentForm);
