import React, { useState, useEffect } from 'react';
import GroupGridIcon from '../../images/groupgridicon.png';
import PropTypes from 'prop-types';
import './Login.css';
// Redux Toolkit
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { loginUser } from '../../features/users/usersSlice';
import { loadingUi } from '../../features/ui/uiSlice';
// Libraries
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// Material-UI
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  form: {
    textAlign: 'center',
  },
  button: {
    margin: 20,
    position: 'relative',
  },
  textField: {
    margin: '10px auto 10px auto',
  },
};

const Login = ({ classes }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [prevUiErrors] = useState(null);
  const loading = useSelector(state => state.ui.loading);
  const uiErrors = useSelector(state => state.ui.errors);
  const dispatch = useDispatch();
  const history = useHistory();
  const { form, textField, button } = classes;

  useEffect(() => {
    if (prevUiErrors !== uiErrors) setErrors(uiErrors);
  }, [prevUiErrors, uiErrors]);

  const handleFormSubmit = event => {
    event.preventDefault();
    dispatch(loadingUi(true));
    const userData = {
      email: email,
      password: password,
    };
    dispatch(loginUser(userData, history));
  };

  return (
    <Grid container className={form}>
      <Grid item sm />
      <Grid item sm>
        <img src={GroupGridIcon} alt='GroupGrid Icon' className='icon' />
        <Typography className='title' variant='h3'>
          GroupGrid
        </Typography>
        <form noValidate onSubmit={handleFormSubmit}>
          <TextField
            id='email'
            name='email'
            type='email'
            label='Email'
            className={textField}
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
            className={textField}
            helperText={errors.password}
            error={errors.password ? true : false}
            value={password}
            onChange={event => setPassword(event.target.value)}
            fullWidth
          />
          {errors.general && (
            <Typography variant='body2' className='error'>
              {errors.general}
            </Typography>
          )}
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={button}
            disabled={loading}>
            Login
            {loading && <CircularProgress size={30} className='spinner' />}
          </Button>
          <br />
          <small>
            Don't have an account? Sign up{' '}
            <Router>
              <Link to='/signup'>here</Link>
            </Router>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  loadingUi: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  uiErrors: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Login);
