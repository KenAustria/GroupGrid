import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Login.css';
// Redux
import { loginUser } from '../../store/actions/userActions';
import { connect } from 'react-redux';
// Material-UI
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import GroupGridIcon from '../../images/groupgridicon.png';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = {
	form: {
		textAlign: 'center'
	},
	button: {
		margin: 20,
		position: 'relative'
	}
};

class Login extends Component {
	state = {
		email: '',
		password: '',
		errors: {}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		// if we receive errors, set errors to local errors state object
		if (nextProps.ui.errors) {
      this.setState({ errors: nextProps.ui.errors });
    }
  }

	inputChangeHandler = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	submitFormHandler = (event) => {
		event.preventDefault();
		const userData = {
			email: this.state.email,
			password: this.state.password
		};
		this.props.loginUser(userData, this.props.history);
	}

	// helperText is not working
	render() {
		const { classes, ui: { loading } } = this.props;
		const { email, password, errors } = this.state;
		return (
			<Grid container className={classes.form}>
				<Grid item sm />
				<Grid item sm>
					<img src={GroupGridIcon} alt="GroupGrid Icon" className='icon' />
					<Typography className='title' variant='h3'>GroupGrid</Typography>
					<form noValidate onSubmit={this.submitFormHandler}>
						<TextField
							id='email'
							name='email'
							type='email'
							label='Email'
							className='textField'
							helperText={errors.email}
							error={errors.email ? true : false}
							value={email}
							onChange={this.inputChangeHandler}
							fullWidth
						/>
						<TextField
							id='password'
							name='password'
							type='password'
							label='Password'
							className='textField'
							helperText={errors.password}
							error={errors.password ? true : false}
							value={password}
							onChange={this.inputChangeHandler}
							fullWidth
						/>
						{errors.general && (
							<Typography variant="body2" className='error'>
								{errors.general}
							</Typography>
						)}
						<Button
							type='submit'
							variant='contained'
							color='primary'
							className={classes.button}
							disabled={loading}
						>
							Login
							{loading && (
								<CircularProgress size={30} className='spinner' />
							)}
						</Button>
						<br />
						<small>
							Don't have an account? Sign up <Link to="/signup">here</Link>
						</small>
					</form>
				</Grid>
				<Grid item sm />
			</Grid>
		)
	}
}

const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui
});

const mapActionsToProps = {
  loginUser
};

Login.propTypes = {
	classes: PropTypes.object.isRequired,
	loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));