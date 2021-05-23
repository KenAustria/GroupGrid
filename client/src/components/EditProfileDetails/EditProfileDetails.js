import React, { Component, Fragment } from 'react';
import MyButton from '../MyButton/MyButton';
import PropTypes from 'prop-types';
// Material-UI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
// Redux
import { connect } from 'react-redux';
import { editUserDetails } from '../../store/actions/userActions';

const styles = () => ({
  button: {
    float: 'right'
	},
	textField: {
    margin: '10px 10px 10px 10px'
  }
});
class EditProfileDetails extends Component {
	state = {
		bio: '',
		website: '',
		location: '',
		open: false
	};

	componentDidMount() {
		const { credentials } = this.props;
		this.mapUserDetailsToState(credentials);
	}

	mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
      location: credentials.location ? credentials.location : ''
    });
	};

	openDialogHandler = () => {
		this.setState({ open: true });
		this.mapUserDetailsToState(this.props.credentials);
	}

	closeDialogHandler = () => {
		this.setState({ open: false });
	}

	inputChangeHandler = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	submitUserDetailsHandler = () => {
		const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location
    };
		this.props.editUserDetails(userDetails);
		this.closeDialogHandler();
	}

	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<MyButton
          title='Edit Details'
          onClick={this.openDialogHandler}
          btnClassName={classes.button}
        >
          <EditIcon color='primary' data-testid='edit-icon' />
        </MyButton>
				<Dialog open={this.state.open} onClose={this.closeDialogHandler} fullWidth maxWidth='sm'>
					<DialogTitle alt='Edit Profile Details'>Edit Profile Details</DialogTitle>
						<TextField
							name='bio'
							type='text'
							label='Bio'
							multiline
							rows='3'
							className={classes.textField}
							placeholder='Enter Bio..'
							value={this.state.bio}
							onChange={this.inputChangeHandler}
							fullwidth
						/>
						<TextField
							name='website'
							type='text'
							label='Website'
							multiline
							rows='3'
							className={classes.textField}
							placeholder='Enter Website..'
							value={this.state.website}
							onChange={this.inputChangeHandler}
							fullwidth
						/>
						<TextField
							name='location'
							type='text'
							label='Location'
							multiline
							rows='3'
							className={classes.textField}
							placeholder='Enter Location..'
							value={this.state.location}
							onChange={this.inputChangeHandler}
							fullwidth
						/>
					<DialogActions>
						<Button onClick={this.closeDialogHandler} color='primary' variant='contained' data-testid='cancel-button'>
							Cancel
						</Button>
						<Button onClick={this.submitUserDetailsHandler} color='primary' variant='contained'>
							Save
						</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
  credentials: state.user.credentials
});

EditProfileDetails.propTypes = {
	editUserDetails: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditProfileDetails));