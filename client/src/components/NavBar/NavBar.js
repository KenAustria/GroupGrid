import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'react-router-dom/Link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBar() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<AppBar position='static' className='root'>
				<Toolbar>
					<Typography variant='h6' className={classes.title}>
						<Button color='inherit' component={Link} to='/'>GroupGrid</Button>
					</Typography>
					<Button color='inherit' component={Link} to='/login'>Login</Button>
					<Button color='inherit' component={Link} to='/signup'>Signup</Button>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default NavBar;