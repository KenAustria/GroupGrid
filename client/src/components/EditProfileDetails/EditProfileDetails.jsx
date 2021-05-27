import React, { useState, useEffect } from 'react';
import MyButton from '../MyButton';
// Redux Toolkit
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { editUserDetails } from '../../features/users/usersSlice';
// Material-UI
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = () => ({
  button: {
    float: 'right',
  },
  textField: {
    margin: '10px 10px 10px 10px',
  },
});

const EditProfileDetails = () => {
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [open, setOpen] = useStatea(false);
  const credentials = useSelector(state => state.users.credentials);
  const dispatch = useDispatch();

  useEffect(() => handleMapUserDetailsToState(credentials));

  const handleMapUserDetailsToState = credentials => {
    setBio(credentials.bio ? credentials.bio : '');
    setWebsite(credentials.website ? credentials.website : '');
    setLocation(credentials.location ? credentials.location : '');
  };

  const handleOpenDialog = ({ classes }) => {
    setOpen(true);
    handleMapUserDetailsToState(credentials);
  };

  const handleCloseDialog = () => setOpen(false);

  const handleSubmitUserDetails = () => {
    const userDetails = {
      bio: bio,
      website: website,
      location: location,
    };
    dispatch(editUserDetails(userDetails));
    handleCloseDialog();
  };

  return (
    <>
      <MyButton
        title='Edit Details'
        onClick={handleOpenDialog}
        btnClassName={classes.button}>
        <EditIcon color='primary' data-testid='edit-icon' />
      </MyButton>
      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth='sm'>
        <DialogTitle alt='Edit Profile Details'>
          Edit Profile Details
        </DialogTitle>
        <TextField
          name='bio'
          type='text'
          label='Bio'
          multiline
          rows='3'
          className={classes.textField}
          placeholder='Enter Bio..'
          value={bio}
          onChange={event => setBio(event.target.value)}
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
          value={website}
          onChange={event => setWebsite(event.target.value)}
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
          value={location}
          onChange={event => setLocation(event.target.value)}
          fullwidth
        />
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color='primary'
            variant='contained'
            data-testid='cancel-button'>
            Cancel
          </Button>
          <Button
            onClick={handleSubmitUserDetails}
            color='primary'
            variant='contained'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(EditProfileDetails);
