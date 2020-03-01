import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import AuthRoute from './components/AuthRoute/AuthRoute';
// import { MuiThemeProvider } from '@material-ui/core/styles/MuiThemeProvider';
// import { createMuiTheme } from '@material-ui/core/styles';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
// import { createMuiTheme } from '@material-ui/core/styles/createMuiTheme';

// const myTheme = createMuiTheme({
// 	palette: {
//     primary: {
// 			main: '#6699cc',
// 			contrastText: '#fff'
//     },
//     secondary: {
// 			main: '#42a5f5',
// 			contrastText: '#fff'
//     },
//   }
// })

let authenticated;
// access token from local storage
const token = localStorage.FirebaseIdToken;
// if token exist, decode json web token access expiry date
if (token) {
  const decodedToken = jwtDecode(token);
	// if expired, redirect to login page
	if (decodedToken.exp * 1000 < Date.now()) {
    authenticated = false;
    window.location.href = '/login';
  } else {
    authenticated = true;
	}
}

function App() {
	return (
		// <MuiThemeProvider>
		<div>
			<Router>
				<NavBar />
				<div className="container">
					<Switch>
						<Route exact path='/' component={Home}/>
						<AuthRoute exact path="/login" component={Login} authenticated={authenticated} />
						<AuthRoute exact path="/signup" component={Signup} authenticated={authenticated} />
					</Switch>
				</div>
			</Router>
		</div>
		// </MuiThemeProvider>
	);
}

export default App;