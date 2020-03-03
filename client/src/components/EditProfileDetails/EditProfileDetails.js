import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './EditProfileDetails.css';
// Material-UI
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
// Redux
import { connect } from 'react-redux';
import { editUserDetails } from '../../store/actions/userActions';

class EditProfileDetails extends Component {
	state = {
		bio: '',
		website: '',
		location: '',
		open: false
	};

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

	componentDidMount() {
		const { credentials } = this.props;
		this.mapUserDetailsToState(credentials);
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
		return (
			<Fragment>
				<Tooltip title='Edit Profile Details' placement='top'>
					<IconButton onClick={this.openDialogHandler} className='button'>
						<EditIcon color='primary' />
					</IconButton>
				</Tooltip>
				<Dialog open={this.state.open} onClose={this.closeDialogHandler} fullWidth maxWidth='sm'>
					<DialogTitle>Edit Profile Details</DialogTitle>
					<DialogContent>
						<form>
							<TextField
								name='bio'
								type='text'
								label='Bio'
								multiline
								rows='3'
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
								placeholder='Enter Location..'
								value={this.state.location}
								onChange={this.inputChangeHandler}
								fullwidth
							/>
						</form>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.closeDialogHandler} color='primary'>
							Cancel
						</Button>
						<Button onClick={this.submitUserDetailsHandler} color='primary'>
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

const mapActionsToProps = {
  editUserDetails
};

EditProfileDetails.propTypes = {
	editUserDetails: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(EditProfileDetails);