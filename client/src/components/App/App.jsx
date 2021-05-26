import React from "react";
import NavBar from "../NavBar";
import Home from "../Home";
import AuthRoute from "../../utils/AuthRoute";
import Login from "../Login";
import Signup from "../Signup";
import "./App.css";
// Libraries
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";

let authenticated;
const token = localStorage.FirebaseIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
  } else {
    authenticated = true;
  }
}

const App = () => {
  return (
    <div>
      <Router>
        <NavBar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home} />
            <AuthRoute
              exact
              path='/login'
              component={Login}
              authenticated={authenticated}
            />
            <AuthRoute
              exact
              path='/signup'
              component={Signup}
              authenticated={authenticated}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
