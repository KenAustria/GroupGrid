import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import DeletePost from '../DeletePost/DeletePost';
import PostDialog from '../PostDialog/PostDialog';
import LikeButton from '../LikeButton/LikeButton';
import MyButton from '../MyButton/MyButton';
// Material-UI
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
// Icons
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';

const styles = {
	card: {
    position: 'relative',
  	display: 'flex',
  	marginBottom: '20px'
	},
	content: {
		padding: '25px',
		objectFit: 'cover'
	},
	avatar: {
		width: 70,
		height: 70
	}
};
class Post extends Component {
	render() {
		const { classes } = this.props;
		dayjs.extend(relativeTime);
		const {
      post: {
        body,
        createdAt,
        profileImage,
				userHandle,
				postId,
        likeCount,
        commentCount
			},
			user: {
				authenticated,
				credentials: {handle}
			}
		} = this.props;
		const deleteButton =
      (authenticated && (userHandle === handle)) ? (
        <DeletePost postId={postId} />
      ) : null;
		return (
			<Card className={classes.card}>
				<CardContent className={classes.content}>
					<CardHeader
						avatar={<Avatar alt='Profile Image' src={profileImage} className={classes.avatar} />}
						title={userHandle}
						subheader={dayjs(createdAt).fromNow()}
						component={Link}
						to={`/users/${userHandle}`}
					/>
          <Typography variant='body1'>{body}</Typography>
					<LikeButton postId={postId} />
          <span>{likeCount} Likes</span>
          <MyButton title='Comments'>
						<ChatIcon color='primary' />
          </MyButton>
          <span>{commentCount} Comments</span>
					<PostDialog postId={postId} userHandle={userHandle} openDialog={this.props.openDialog} />
					{deleteButton}
        </CardContent>
    	</Card>
		)
	}
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
	openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Post));