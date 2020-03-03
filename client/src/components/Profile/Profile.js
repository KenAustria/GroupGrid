import React, { Component, Fragment } from 'react';
import EditProfileDetails from '../EditProfileDetails/EditProfileDetails';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import './Profile.css';
// MUI stuff
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
// Icons
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import CalendarToday from '@material-ui/icons/CalendarToday';
import LocationOn from '@material-ui/icons/LocationOn';
import IconButton from '@material-ui/core/IconButton';
import LinkIcon from '@material-ui/icons/Link';
import EditIcon from '@material-ui/icons/Edit';
//Redux
import { connect } from 'react-redux';
import { uploadProfileImage, logoutUser } from '../../store/actions/userActions';

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
      user: {
        credentials: { handle, createdAt, profileImage, bio, website, location },
        loading,
        authenticated
      }
    } = this.props;

    let profile = !loading ? (
      authenticated ? (
        <Paper className='paper'>
          <div className='profile'>
            <div className='imageWrapper'>
              <img src={profileImage} alt='profile' className='profileImage' />
							<input type='file' id='imageInput' hidden='hidden' onChange={this.profileImageChangeHandler} />
							<Tooltip title='Update Profile Photo' placement='top'>
								<IconButton onClick={this.preProfileImageChangeHandler} className='button'>
									<EditIcon color='primary' />
								</IconButton>
							</Tooltip>
            </div>
            <hr />
            <div className='profileDetails'>
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
						<Tooltip title='Logout' placement='top'>
							<IconButton onClick={this.logoutUserHandler}>
								<KeyboardReturn color='primary' />
							</IconButton>
						</Tooltip>
						<EditProfileDetails />
          </div>
        </Paper>
      ) : (
        <Paper className='paper'>
          <Typography variant='body2' align='center'>
            No profile found, please login again
          </Typography>
          <div className='buttons'>
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
	uploadProfileImage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(Profile);