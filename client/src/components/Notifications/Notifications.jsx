import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// Redux Toolkit
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { markTheNotificationsRead } from '../../features/users/usersSlice';
// Libraries
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import relativeTime from 'dayjs/plugin/relativeTime';
// Material-UI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

const Notifications = () => {
  const notifications = useSelector(state => state.users.notifications);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = event => setAnchorEl(event.target);
  const handleClose = () => setAnchorEl(null);

  const handleMenuOpen = () => {
    let unreadNotificationsIds = notifications
      .filter(notification => !notification.read)
      .map(notification => notification.notificationId);
    dispatch(markTheNotificationsRead(unreadNotificationsIds));
  };

  dayjs.extend(relativeTime);
  let notificationsIcon;
  // if notifications exist, and some of those notifications are unread, notifications icon will render with unread count
  if (notifications && notifications.length > 0) {
    notifications.filter(notification => notification.read === false).length > 0
      ? (notificationsIcon = (
          <Badge
            badgeContent={
              notifications.filter(notification => notification.read === false)
                .length
            }
            color='secondary'>
            <NotificationsIcon />
          </Badge>
        ))
      : (notificationsIcon = <NotificationsIcon />); // no unread notifications
  } else {
    notificationsIcon = <NotificationsIcon />; // no notifications
  }

  let notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map(notification => {
        const verb = notification.type === 'like' ? 'liked' : 'commented on';
        const time = dayjs(notification.createdAt).fromNow();
        const iconColor = notification.read ? 'primary' : 'secondary';
        const icon =
          notification.type === 'like' ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );

        return (
          <MenuItem key={notification.createdAt} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              color='default'
              variant='body1'
              to={`/users/${notification.recipient}/post/${notification.postId}`}>
              {notification.sender} {verb} your post {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>No unread notifications</MenuItem>
    );

  return (
    <>
      <Tooltip title='Notifications' position='top'>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup='true'
          onClick={handleOpen}
          data-testid='icon-button'>
          {notificationsIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={handleMenuOpen}>
        {notificationsMarkup}
      </Menu>
    </>
  );
};

// Notifications.propTypes = {
//   markTheNotificationsRead: PropTypes.func.isRequired,
//   notifications: PropTypes.array.isRequired,
// };

export default Notifications;
