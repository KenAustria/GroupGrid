import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Icons
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
// Redux
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../store/actions/dataActions';

class LikeButton extends Component {
	likeCheckerHandler = () => {
		if (this.props.user.likes && this.props.user.likes.find(like => like.postId === this.props.postId)) {
			return true;
		} else return false;
	}

	likePostHandler = () => {
		this.props.likePost(this.props.postId);
	}

	unlikePostHandler = () => {
		this.props.unlikePost(this.props.postId);
	}

	render() {
		const { authenticated } = this.props.user;
		const likeButton = !authenticated ? (
      <Link to='/login'>
				<Tooltip title='Like' placement='top'>
					<Link to='/login'>
						<IconButton>
							<FavoriteBorder color='primary' />
						</IconButton>
					</Link>
				</Tooltip>
			</Link>
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
		return likeButton;
	}
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
	likePost,
	unlikePost
};

LikeButton.propTypes = {
	user: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired,
	likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);