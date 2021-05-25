import React from "react";
import MyButton from "../MyButton";
// Redux Toolkit
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  logoutUser,
  uploadProfileImage,
} from "../../features/users/usersSlice";
// Libraries
import { BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
// Material-UI
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import CalendarToday from "@material-ui/icons/CalendarToday";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import EditIcon from "@material-ui/icons/Edit";

const styles = (theme) => ({
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: theme.palette.primary.main,
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
});

const Profile = ({ classes }) => {
  const loading = useSelector((state) => state.ui.loading);
  const authenticated = useSelector((state) => state.users.authenticated);
  const credentials = useSelector((state) => state.users.credentials);
  const dispatch = useDispatch();

  handleProfileImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    dispatch(uploadProfileImage(formData));
  };

  handlePreProfileImageChange = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  let profile = !loading ? (
    authenticated ? (
      <Router>
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className='image-wrapper'>
              <img
                src={credentials.profileImage}
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
                to={`/users/${credentials.handle}`}
                color='primary'
                variant='h5'>
                @{credentials.handle}
              </MuiLink>
              <hr />
              {credentials.bio && (
                <Typography variant='body2'>{credentials.bio}</Typography>
              )}
              <hr />
              {credentials.location && (
                <>
                  <LocationOn color='primary' />{" "}
                  <span>{credentials.location}</span>
                  <hr />
                </>
              )}
              {credentials.website && (
                <>
                  <LinkIcon color='primary' />
                  <a
                    href={credentials.website}
                    target='_blank'
                    rel='noopener noreferrer'>
                    {" "}
                    {credentials.website}
                  </a>
                  <hr />
                </>
              )}
              <CalendarToday color='primary' />{" "}
              <span>
                Joined {dayjs(credentials.createdAt).format("MMM YYYY")}
              </span>
            </div>
            <MyButton tip='Logout' onClick={handleLogout}>
              <KeyboardReturn color='primary' />
            </MyButton>
            {/* <EditProfileDetails /> */}
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
