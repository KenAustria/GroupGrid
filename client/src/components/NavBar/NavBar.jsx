import React from "react";
// import CreatePost from "../CreatePost"
// import Notifications from "../Notifications"
import "./NavBar.css";
// Redux
import { useSelector } from "react-redux";
// Libraries
import { Link } from "react-router-dom";
// Material-UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";

const NavBar = () => {
  const authenticated = useSelector((state) => state.users.authenticated);
  return (
    <div>
      <Router>
        <AppBar position='static'>
          <Toolbar className='navContainer'>
            {authenticated ? (
              <>
                {/* <CreatePost /> */}
                <Link to='/'>
                  <Tooltip title='Home' placement='top'>
                    <IconButton>
                      <HomeIcon className='iconColor' />
                    </IconButton>
                  </Tooltip>
                </Link>
                {/* <Notifications/> */}
              </>
            ) : (
              <>
                <Typography variant='h6'>
                  <Button color='inherit' component={Link} to='/'>
                    GroupGrid
                  </Button>
                </Typography>
                <Button color='inherit' component={Link} to='/login'>
                  Login
                </Button>
                <Button color='inherit' component={Link} to='/signup'>
                  Signup
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Router>
    </div>
  );
};

export default NavBar;
