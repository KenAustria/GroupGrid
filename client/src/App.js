import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Material-UI
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const myTheme = createMuiTheme({
	palette: {
    primary: {
			main: '#6699cc',
			contrastText: '#fff'
    },
    secondary: {
			main: '#42a5f5',
			contrastText: '#fff'
    },
  }
})


function App() {
  return (
    <MuiThemeProvider theme={myTheme}>
			<div>
				<Router>
					<NavBar />
					<div className='container'>
						<Switch>
							<Route exact path='/' component={Home}/>
							<Route exact path='/signup' component={Signup} />
							<Route exact path='/login' component={Login}/>
						</Switch>
					</div>
				</Router>
			</div>
		</MuiThemeProvider>
  );
}

export default App;