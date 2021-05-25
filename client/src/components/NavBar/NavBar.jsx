import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <AppBar>
      <Toolbar className='nav-container'>
        <Button color='inherit' component={Link} to='/'>
          GroupGrid
        </Button>
        <Button color='inherit' component={Link} to='/login'>
          Login
        </Button>
        <Button color='inherit' component={Link} to='/signup'>
          Signup
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
