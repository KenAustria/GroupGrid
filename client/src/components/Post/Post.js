import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import DeletePost from '../DeletePost/DeletePost';
import PostDialog from '../PostDialog/PostDialog';
import LikeButton from '../LikeButton/LikeButton';
// Material-UI
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
// Icons
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';

class Post extends Component {
	render() {
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
			<Card className='card'>
				<CardHeader
					avatar={<Avatar alt='Profile Image' src={profileImage} />}
					title={userHandle}
					subheader={dayjs(createdAt).fromNow()}
					component={Link}
					to={`/users/${userHandle}`}
				/>
				<CardContent className='content'>
					{deleteButton}
          <Typography variant='body1'>{body}</Typography>
						<LikeButton postId={postId} />
          <span>{likeCount} Likes</span>
          <Tooltip title='Comments' placement='top'>
						<IconButton>
							<ChatIcon color='primary' />
						</IconButton>
					</Tooltip>
          <span>{commentCount} Comments</span>
					<PostDialog postId={postId} userHandle={userHandle} />
        </CardContent>
    	</Card>
		)
	}
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(Post);