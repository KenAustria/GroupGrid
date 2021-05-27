import React from 'react';
// Redux Toolkit
import { useSelector } from 'react-redux';
// Libraries
import { Route, Redirect } from 'react-router-dom';

// const authenticated = useSelector((state) => state.user.authenticated);

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === true ? <Redirect to='/' /> : <Component {...props} />
    }
  />
);

export default AuthRoute;
