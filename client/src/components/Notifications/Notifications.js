import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Libraries
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// Material-Ui
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../store/actions/userActions';

class Notifications extends Component {
	state = {
    anchorEl: null
	};

 	openHandler = (event) => {
		this.setState({ anchorEl: event.target })
	}

	closeHandler = () => {
		this.setState({ anchorEl: null });
	}

	onMenuOpened = () => {
		let unreadNotificationsIds = this.props.notifications
			.filter(notification => !notification.read)
			.map(notification => notification.notificationId);
		this.props.markNotificationsRead(unreadNotificationsIds);
	}

	render() {
		const { notifications } = this.props;
		const { anchorEl } = this.state;

		dayjs.extend(relativeTime);

		let notificationsIcon;
		// if notifications exist, and some of those notifications are unread, notifications icon will render with unread count
		if (notifications && notifications.length > 0) {
			notifications.filter(notification => notification.read === false).length > 0
			? (notificationsIcon = (
				<Badge badgeContent={notifications.filter(notification => notification.read === false).length} color='secondary'>
					<NotificationsIcon />
				</Badge>
			))
		: (notificationsIcon = <NotificationsIcon />) // no unread notifications
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
            <MenuItem key={notification.createdAt} onClick={this.closeHandler} >
              {icon}
              <Typography component={Link} color='default' variant='body1' to={`/users/${notification.recipient}/post/${notification.postId}`}>
                {notification.sender} {verb} your post {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.closeHandler}>
          No unread notifications
        </MenuItem>
      );

		return (
			<Fragment>
        <Tooltip title='Notifications' position='top'>
          <IconButton
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup='true'
						onClick={this.openHandler}
						data-testid='icon-button'
          >
            {notificationsIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.closeHandler}
					onEntered={this.onMenuOpened}
        >
          {notificationsMarkup}
        </Menu>
      </Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
  notifications: state.user.notifications
});

Notifications.propTypes = {
	markNotificationsRead: PropTypes.func.isRequired,
	notification: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { markNotificationsRead })(Notifications);