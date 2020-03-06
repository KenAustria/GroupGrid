import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import DeletePost from '../DeletePost/DeletePost';
import PostDialog from '../PostDialog/PostDialog';
// Material-UI
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
// Redux
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../store/actions/dataActions';
// Icons
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ChatIcon from '@material-ui/icons/Chat';

class Post extends Component {
	likeCheckerHandler = () => {
		if (this.props.user.likes && this.props.user.likes.find(like => like.postId === this.props.post.postId)) {
			return true;
		} else return false;
	}

	likePostHandler = () => {
		this.props.likePost(this.props.post.postId);
	}

	unlikePostHandler = () => {
		this.props.unlikePost(this.props.post.postId);
	}

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
		const likeButton = !authenticated ? (
      <Tooltip title='Like' placement='top'>
				<Link to='/login'>
					<IconButton>
						<FavoriteBorder color='primary' />
					</IconButton>
				</Link>
			</Tooltip>
    ) : this.likeCheckerHandler() ? (
      <Tooltip title='Unlike' placement='top'>
				<IconButton onClick={this.unlikePostHandler}>
					<FavoriteIcon color='primary' />
				</IconButton>
			</Tooltip>
    ) : (
			<Tooltip title='Like' placement='top'>
				<IconButton onClick={this.likePostHandler}>
					<FavoriteBorder color='primary' />
				</IconButton>
			</Tooltip>
		);
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
          <Typography variant="body1">{body}</Typography>
					{likeButton}
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
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
	likePost,
	unlikePost
};

export default connect(mapStateToProps, mapActionsToProps)(Post);