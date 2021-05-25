import React, { useState, useEffect, useRef } from "react";
import GroupGridIcon from "../../images/groupgridicon.png";
import { loginUser } from "../features/users/usersSlice";
import { loadingUi } from "../features/ui/uiSlice";
import "./Login.css";
// Libraries
import { BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// Material-UI
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const styles = {
  form: {
    textAlign: "center",
  },
  button: {
    margin: 20,
    position: "relative",
  },
  textField: {
    margin: "10px auto 10px auto",
  },
};

const Login = ({ classes }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.ui.loading);
  const uiErrors = useSelector((state) => state.ui.errors);
  const prevProps = useRef();

  useEffect(() => {
    if (prevProps.uiErrors !== uiErrors) {
      setErrors(uiErrors);
    }
  }, [uiErrors]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(loadingUi(true));
    const userData = {
      email: email,
      password: password,
    };
    dispatch(loginUser(userData, history));
  };

  return (
    <Grid container className={classes.form}>
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
            className={classes.textField}
            // helperText={errors.email} // helperText is not working
            // error={errors.email ? true : false}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
          />
          <TextField
            id='password'
            name='password'
            type='password'
            label='Password'
            className={classes.textField}
            // helperText={errors.password} // helperText is not working
            // error={errors.password ? true : false}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
          />
          {/* {errors.general && (
            <Typography variant='body2' className='error'>
              {errors.general}
            </Typography>
          )} */}
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
            disabled={loading}>
            Login
            {loading && <CircularProgress size={30} className='spinner' />}
          </Button>
          <br />
          <small>
            Don't have an account? Sign up{" "}
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

export default withStyles(styles)(Login);
