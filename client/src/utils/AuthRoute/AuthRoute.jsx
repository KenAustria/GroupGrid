import React from 'react';
// import PropTypes from 'prop-types';
// Libraries
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  // if authenticated, redirect to homepage, otherwise redirect to signup or login
  <Route
    {...rest}
    render={props =>
      authenticated === true ? <Redirect to='/' /> : <Component {...props} />
    }
  />
);

// AuthRoute.propTypes = {
//   authenticated: PropTypes.bool.isRequired,
// };

export default AuthRoute;
