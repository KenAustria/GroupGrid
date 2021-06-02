import React, { useState, useEffect } from 'react';
import './Signup.css';
import PropTypes from 'prop-types';
// Redux Toolkit
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../features/users/usersSlice';
// Libraries
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
// Material-UI
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import GroupGridIcon from '../../images/groupgridicon.png';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = {
  form: {
    textAlign: 'center',
  },
  button: {
    margin: 20,
  },
};

const Signup = ({ classes }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [handle, setHandle] = useState('');
  const [errors, setErrors] = useState({});
  const [setLoading] = useState(false);
  const [prevUiErrors] = useState(null);
  const uiLoading = useSelector(state => state.ui.loading);
  const uiErrors = useSelector(state => state.ui.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // if we receive errors, set errors to local errors state object1
    if (prevUiErrors !== uiErrors) setErrors(uiErrors);
  }, [prevUiErrors, uiErrors]);

  const handleFormSubmit = event => {
    event.preventDefault();
    setLoading(true);
    const newUserData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      handle: handle,
    };
    dispatch(signupUser(newUserData, history));
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={GroupGridIcon} alt='GroupGrid Icon' />
        <Typography variant='h3'>GroupGrid</Typography>
        <form noValidate onSubmit={handleFormSubmit}>
          <TextField
            id='email'
            name='email'
            type='email'
            label='Email'
            className='textField'
            helperText={errors.email}
            error={errors.email ? true : false}
            value={email}
            onChange={event => setEmail(event.target.value)}
            fullWidth
          />
          <TextField
            id='password'
            name='password'
            type='password'
            label='Password'
            className='textField'
            helperText={errors.password}
            error={errors.password ? true : false}
            value={password}
            onChange={event => setPassword(event.target.value)}
            fullWidth
          />
          <TextField
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            label='Confirm Password'
            className='textField'
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
            fullWidth
          />
          <TextField
            id='handle'
            name='handle'
            type='handle'
            label='Handle'
            className='textField'
            helperText={errors.handle}
            error={errors.handle ? true : false}
            value={handle}
            onChange={event => setHandle(event.target.value)}
            fullWidth
          />
          {errors.general && (
            <Typography variant='body2'>{errors.general}</Typography>
          )}
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
            disabled={uiLoading}>
            Signup
            {uiLoading && <CircularProgress size={30} className='spinner' />}
          </Button>
          <br />
          <small>
            Already have an account? Log in{' '}
            <Router>
              <Link to='/login'>here</Link>
            </Router>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
  uiLoading: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Signup);
