import React from 'react';
import NavBar from '../NavBar';
import Home from '../Home';
import Signup from '../Signup';
import Login from '../Login';
import UserProfile from '../UserProfile';
import AuthRoute from '../../utils/AuthRoute';
import './App.css';
// Redux Toolkit
import { useDispatch } from 'react-redux';
import {
  logoutUser,
  setAuthenticated,
  getUserData,
} from '../../features/users/usersSlice';
// Libraries
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

axios.defaults.baseURL =
  'https://shielded-journey-88539.herokuapp.com/https://us-central1-groupgrid-1d191.cloudfunctions.net/api';

// access token from local storage
const token = localStorage.FirebaseIdToken;

const App = () => {
  const dispatch = useDispatch();

  // if token exist, decode json web token access expiry date
  if (token) {
    const decodedToken = jwtDecode(token);
    // if expired, delete token then redirect logged out user to the login page
    if (decodedToken.exp * 1000 < Date.now()) {
      dispatch(logoutUser());
      window.location.href = '/login';
    } else {
      dispatch(setAuthenticated()); // otherwise, authorize user
      axios.defaults.headers.common['Authorization'] = token;
      dispatch(getUserData());
    }
  }

  return (
    <>
      <Router>
        <NavBar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home} />
            <AuthRoute path='/login' component={Login} />
            <AuthRoute path='/signup' component={Signup} />
            <Route exact path='/users/:handle' component={UserProfile} />
            <Route
              exact
              path='/users/:handle/post/:postId'
              component={UserProfile}
            />
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;
