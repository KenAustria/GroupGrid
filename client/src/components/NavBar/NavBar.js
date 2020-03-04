import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './NavBar.css';
// Material-UI
// import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
// Icons
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';
// Redux
import { connect } from 'react-redux';

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   title: {
//     flexGrow: 1,
//   }
// }));

class NavBar extends Component {
  render() {
    // const classes = useStyles();
		const { authenticated } = this.props;
    return (
			// <div className={classes.root}>
			<div>
				<AppBar position='static' className='root'>
					<Toolbar>
						{authenticated ? (
							<Fragment>
								<Tooltip title='Create a Post' placement='top'>
									<IconButton>
										<AddIcon className='iconColor' />
									</IconButton>
								</Tooltip>
								<Link to='/'>
									<Tooltip title='Home' placement='top'>
										<IconButton>
											<HomeIcon className='iconColor' />
										</IconButton>
									</Tooltip>
								</Link>
								<Tooltip title='Notifications' placement='top'>
									<IconButton>
										<Notifications className='iconColor' />
									</IconButton>
								</Tooltip>
							</Fragment>
						) : (
							<Fragment>
								{/* <Typography variant='h6' className={classes.title}> */}
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