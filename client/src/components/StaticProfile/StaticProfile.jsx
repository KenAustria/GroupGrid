import React from 'react';
// import PropTypes from 'prop-types';
// Libraries
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// Material-UI
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  paper: {
    padding: 20,
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
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
  },
});

const StaticProfile = ({ classes, userProfile }) => {
  const { paper, profile } = classes;
  const {
    handle,
    createdAt,
    profileImage,
    bio,
    website,
    location,
  } = userProfile;

  return (
    <Paper className={paper}>
      <div className={profile}>
        <div className='image-wrapper'>
          <img src={profileImage} alt='profile' className='profile-image' />
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
          {bio && <Typography variant='body2'>{bio}</Typography>}
          <hr />
          {location && (
            <>
              <LocationOn color='primary' /> <span>{location}</span>
              <hr />
            </>
          )}
          {website && (
            <>
              <LinkIcon color='primary' />
              <a href={website} target='_blank' rel='noopener noreferrer'>
                {' '}
                {website}
              </a>
              <hr />
            </>
          )}
          <CalendarToday color='primary' />
          {''}
          <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
        </div>
      </div>
    </Paper>
  );
};

// StaticProfile.propTypes = {
//   profile: PropTypes.object.isRequired,
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(StaticProfile);
