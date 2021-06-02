import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

const CommentForm = ({ classes, postId }) => {
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});
  const [prevUiErrors] = useState(null);
  const uiErrors = useSelector(state => state.ui.errors);
  const authenticated = useSelector(state => state.users.authenticated);
  const dispatch = useDispatch();
  const { textField, button } = classes;

  if (prevUiErrors !== uiErrors) setErrors(uiErrors);

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(submitComment(postId, body));
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
          className={textField}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          className={button}
          alt='submit'>
          Submit
        </Button>
      </form>
    </Grid>
  ) : null;

  return commentForm;
};

CommentForm.propTypes = {
  classes: PropTypes.object.isRequired,
  uiErrors: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  submitComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};

export default withStyles(styles)(CommentForm);
