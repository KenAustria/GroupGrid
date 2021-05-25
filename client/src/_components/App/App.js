import React from 'react';
import './App.css';
import NavBar from '../NavBar/NavBar';
import Home from '../Home/Home';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import UserProfile from '../UserProfile/UserProfile';
import AuthRoute from '../AuthRoute/AuthRoute';
// Libraries
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
// Redux
import store from '../../_store/_myStore';
import { logoutUser, getUserData } from '../../_store/actions/userActions';
import { SET_AUTHENTICATED } from '../../_store/actions/actionTypes';

axios.defaults.baseURL = 'https://us-central1-groupgrid-1d191.cloudfunctions.net/api';

// access token from local storage
const token = localStorage.FirebaseIdToken;
// if token exist, decode json web token access expiry date
if (token) {
  const decodedToken = jwtDecode(token);
	// if expired, delete token then redirect logged out user to the login page
	if (decodedToken.exp * 1000 < Date.now()) {
		store.dispatch(logoutUser());
    window.location.href = '/login';
  } else { // otherwise, authorize user
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
	}
}

function App() {
	return (
		<>
			<Router>
				<NavBar />
				<div className="container">
					<Switch>
						<Route exact path='/' component={Home}/>
						<AuthRoute exact path='/login' component={Login} />
						<AuthRoute exact path='/signup' component={Signup} />
						<Route exact path='/users/:handle' component={UserProfile} />
						<Route exact path='/users/:handle/post/:postId' component={UserProfile} />
					</Switch>
				</div>
			</Router>
		</>
	);
}

export default App;