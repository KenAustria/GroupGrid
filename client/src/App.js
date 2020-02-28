import React from 'react';
import './App.css';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
			<Router>
				<div className="container">
					<Switch>
						<Route exact path='/' component={Home}/>
						<Route exact path='/signup' component={Signup} />
						<Route exact path='/login' component={Login}/>
					</Switch>
				</div>
      </Router>
    </div>
  );
}

export default App;