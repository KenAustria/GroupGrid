import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MyButton from '../MyButton/MyButton';
// Libraries
import { BrowserRouter as Router } from 'react-router-dom';
// Icons
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
// Redux
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../store/actions/dataActions';

export class LikeButton extends Component {
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
      <Router>
				<Link to='/login'>
					<MyButton title='Like'>
						<FavoriteBorder color='primary' data-testid='favorite-icon' />
					</MyButton>
				</Link>
			</Router>
			) : this.likeCheckerHandler() ? (
				<Router>
					<MyButton alt='Unlike' title='Unlike' onClick={this.unlikePostHandler}>
						<FavoriteIcon color='primary' />
					</MyButton>
				</Router>
			) : (
				<Router>
					<MyButton title='Like' onClick={this.likePostHandler}>
						<FavoriteBorder color='primary' />
					</MyButton>
				</Router>
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