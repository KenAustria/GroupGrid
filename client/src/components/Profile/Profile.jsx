import React from 'react';
import MyButton from '../MyButton';
import EditProfileDetails from '../EditProfileDetails';
// Redux Toolkit
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  logoutUser,
  uploadProfileImage,
} from '../../features/users/usersSlice';
// Libraries
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// Material-UI
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import CalendarToday from '@material-ui/icons/CalendarToday';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import EditIcon from '@material-ui/icons/Edit';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  paper: {
    padding: 20,
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%',
      },
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%',
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle',
      },
      '& a': {
        color: theme.palette.primary.main,
      },
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0',
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px',
    },
  },
});

const Profile = ({ classes }) => {
  const credentials = useSelector((state) => state.users.credentials);
  const loading = useSelector((state) => state.users.loading);
  const authenticated = useSelector((state) => state.users.authenticated);
  const dispatch = useDispatch();
  const { handle, createdAt, profileImage, bio, website, location } = credentials
  const { paper, profile, buttons } = classes

  const handleProfileImageChange = event => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    dispatch(uploadProfileImage(formData));
  };

  const handlePreProfileImageChange = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  const handleLogout = () => dispatch(logoutUser());

  let profile = !loading ? (
    authenticated ? (
      <Router>
        <Paper className={paper}>
          <div className={profile}>
            <div className='image-wrapper'>
              <img
                src={profileImage}
                alt='profile'
                className='profile-image'
              />
              <input
                type='file'
                id='imageInput'
                hidden='hidden'
                onChange={handleProfileImageChange}
              />
              <MyButton
                title='Update Profile Photo'
                onClick={handlePreProfileImageChange}
                btnClassName='button'>
                <EditIcon color='primary' />
              </MyButton>
            </div>
            <hr />
            <div className='profile-details'>
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
                color='primary'
                variant='h5'>
                @{handle}
              </MuiLink>
              <hr />
              {bio && (
                <Typography variant='body2'>{bio}</Typography>
              )}
              <hr />
              {location && (
                <>
                  <LocationOn color='primary' />{' '}
                  <span>{location}</span>
                  <hr />
                </>
              )}
              {website && (
                <>
                  <LinkIcon color='primary' />
                  <a
                    href={website}
                    target='_blank'
                    rel='noopener noreferrer'>
                    {' '}
                    {website}
                  </a>
                  <hr />
                </>
              )}
              <CalendarToday color='primary' />{' '}
              <span>
                Joined {dayjs(createdAt).format('MMM YYYY')}
              </span>
            </div>
            <MyButton tip='Logout' onClick={handleLogout}>
              <KeyboardReturn color='primary' />
            </MyButton>
            <EditProfileDetails />
          </div>
        </Paper>
      </Router>
    ) : (
      <Router>
        <Paper className={paper}>
          <Typography variant='body2' align='center'>
            No profile found, please login again
          </Typography>
          <div className={buttons}>
            <Button
              variant='contained'
              color='primary'
              component={Link}
              to='/login'>
              Login
            </Button>
            <Button
              variant='contained'
              color='secondary'
              component={Link}
              to='/signup'>
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
};

export default withStyles(styles)(Profile);
