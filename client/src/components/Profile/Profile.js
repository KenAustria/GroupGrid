import React, { Component, Fragment } from 'react';
import MyButton from '../MyButton/MyButton';
import EditProfileDetails from '../EditProfileDetails/EditProfileDetails';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
// Libraries
import { BrowserRouter as Router } from 'react-router-dom';
// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
// Icons
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import CalendarToday from '@material-ui/icons/CalendarToday';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import EditIcon from '@material-ui/icons/Edit';
//Redux
import { connect } from 'react-redux';
import { uploadProfileImage, logoutUser } from '../../store/actions/userActions';

const styles = (theme) => ({
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: theme.palette.primary.main
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
});

class Profile extends Component {
	profileImageChangeHandler = (event) => {
		const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadProfileImage(formData);
	}

	preProfileImageChangeHandler = () => {
		const fileInput = document.getElementById('imageInput');
    fileInput.click();
	}

	logoutUserHandler = () => {
		this.props.logoutUser();
	}

	render() {
    const {
			classes,
      user: {
        credentials: { handle, createdAt, profileImage, bio, website, location },
        loading,
        authenticated
      }
    } = this.props;

		let profile = !loading ? (
      authenticated ? (
				<Router>
					<Paper className={classes.paper}>
						<div className={classes.profile}>
							<div className='image-wrapper'>
								<img src={profileImage} alt='profile' className='profile-image' />
								<input type='file' id='imageInput' hidden='hidden' onChange={this.profileImageChangeHandler} />
								<MyButton
									title='Update Profile Photo'
									onClick={this.preProfileImageChangeHandler}
									btnClassName='button'
								>
									<EditIcon color='primary' />
								</MyButton>
							</div>
							<hr />
							<div className='profile-details'>
								<MuiLink
									component={Link}
									to={`/users/${handle}`}
									color='primary'
									variant='h5'
								>
									@{handle}
								</MuiLink>
								<hr />
								{bio && <Typography variant='body2'>{bio}</Typography>}
								<hr />
								{location && (
									<Fragment>
										<LocationOn color='primary' /> <span>{location}</span>
										<hr />
									</Fragment>
								)}
								{website && (
									<Fragment>
										<LinkIcon color='primary' />
										<a href={website} target='_blank' rel='noopener noreferrer'>
											{' '}
											{website}
										</a>
										<hr />
									</Fragment>
								)}
								<CalendarToday color='primary' />{' '}
								<span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
							</div>
								<MyButton tip='Logout' onClick={this.logoutUserHandler}>
									<KeyboardReturn color='primary' />
								</MyButton>
								<EditProfileDetails />
						</div>
					</Paper>
				</Router>
      ) : (
				<Router>
					<Paper className={classes.paper}>
						<Typography variant='body2' align='center'>
							No profile found, please login again
						</Typography>
						<div className={classes.buttons}>
							<Button
								variant='contained'
								color='primary'
								component={Link}
								to='/login'
							>
								Login
							</Button>
							<Button
								variant='contained'
								color='secondary'
								component={Link}
								to='/signup'
							>
								Signup
							</Button>
						</div>
					</Paper>
				</Router>
      )
    ) : (
      <p>Loading...</p>
    );

    return profile;
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = { 
	uploadProfileImage,
	logoutUser
 };

Profile.propTypes = {
	user: PropTypes.object.isRequired,
	uploadProfileImage: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));