import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Signup.css';
// Redux
import { signupUser } from '../../store/actions/userActions';
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

class Signup extends Component {
	state = {
		email: '',
		password: '',
		confirmPassword: '',
		handle: '',
		errors: {}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
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
		this.setState({
			loading: true
		});
		const newUserData = {
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
			handle: this.state.handle
		};
		this.props.signupUser(newUserData, this.props.history);
	}

	render() {
		const { classes, ui: { loading } } = this.props;
		const { email, password, confirmPassword, handle, errors } = this.state;
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
						<TextField
							id='confirmPassword'
							name='confirmPassword'
							type='confirmPassword'
							label='Confirm Password'
							className='textField'
							helperText={errors.confirmPassword}
							error={errors.confirmPassword ? true : false}
							value={confirmPassword}
							onChange={this.inputChangeHandler}
							fullWidth
						/>
						<TextField
							id='handle'
							name='handle'
							type='handle'
							label='Handle'
							className='textField'
							helperText={errors.handle}
							error={errors.handle ? true : false}
							value={handle}
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
							Signup
							{loading && (
								<CircularProgress size={30} className='spinner' />
							)}
						</Button>
						<br />
						<small>
							Already have an account? Log in <Link to="/login">here</Link>
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
  signupUser
};

Signup.propTypes = {
	classes: PropTypes.object.isRequired,
	signupUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Signup));