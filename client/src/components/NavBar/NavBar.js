import React, { Component, Fragment } from 'react';
import CreatePost from '../CreatePost/CreatePost';
import Notifications from '../Notifications/Notifications';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './NavBar.css';
// Material-UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
// Icons
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
// Redux
import { connect } from 'react-redux';

class NavBar extends Component {
  render() {
		const { authenticated } = this.props;
    return (
			<div>
				<AppBar position='static'>
					<Toolbar className='navContainer'>
						{authenticated ? (
							<Fragment>
								<CreatePost />
								<Link to='/'>
									<Tooltip title='Home' placement='top'>
										<IconButton>
											<HomeIcon className='iconColor' />
										</IconButton>
									</Tooltip>
								</Link>
								<Notifications />
							</Fragment>
						) : (
							<Fragment>
								<Typography variant='h6'>
									<Button color='inherit' component={Link} to='/'>GroupGrid</Button>
								</Typography>
								<Button color='inherit' component={Link} to='/login'>Login</Button>
								<Button color='inherit' component={Link} to='/signup'>Signup</Button>
							</Fragment>
						)}
					</Toolbar>
				</AppBar>
			</div>
    );
  }
}

NavBar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(NavBar);