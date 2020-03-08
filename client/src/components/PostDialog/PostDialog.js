import React, { Component, Fragment } from 'react';
import LikeButton from '../LikeButton/LikeButton';
import Comments from '../Comments/Comments';
import CommentForm from '../CommentForm/CommentForm';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// Material-UI
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';
import { getPost, clearErrors } from '../../store/actions/dataActions';

const styles = {
	invisibleSeparator: {
    border: 'none',
    margin: 4
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '90%'
	},
	expandButton: {
    position: 'absolute',
    left: '90%'
  }
};

class PostDialog extends Component {
	state = {
		open: false
	}

	openHandler = () => {
		this.setState({ open: true });
		this.props.getPost(this.props.postId);
	};

	closeHandler = () => {
		this.setState({ open: false });
		this.props.clearErrors();
	};

	componentDidMount() {
		if (this.props.openDialog) {
			this.openHandler()
		}
	}

	render() {
		const {
			classes,
			post: {
        body,
        createdAt,
        profileImage,
				userHandle,
				postId,
        likeCount,
				commentCount,
				comments
			},
			ui: {
				loading
			}
		} = this.props;
		const postDialog = loading ? (
      <CircularProgress size={200} />
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={5}>
          <img src={profileImage} alt='Profile' className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography component={Link} color='primary' variant='h5' to={`/users/${userHandle}`}>
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant='body2' color='textSecondary'>
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant='body1'>{body}</Typography>
					<LikeButton postId={postId} />
					<span>{likeCount} Likes</span>
					<Tooltip title='Comments'>
						<IconButton onClick={this.openHandler} className={classes.expandButton}>
							<ChatIcon color='primary' />
						</IconButton>
					</Tooltip>
					<span>{commentCount} Comments</span>
        </Grid>
				<hr className={classes.visibleSeparator} />
				<CommentForm postId={postId} />
        <Comments comments={comments} />
      </Grid>
    );
		return (
			<Fragment>
				<Tooltip title='Expand Post'>
					<IconButton onClick={this.openHandler} className={classes.expandButton}>
						<UnfoldMore color='primary' />
					</IconButton>
				</Tooltip>
				<Dialog open={this.state.open} onClose={this.closeHandler} fullWidth maxWidth='sm'>
					<Tooltip title='Close'>
						<IconButton onClick={this.closeHandler} className={classes.closeButton}>
							<CloseIcon />
						</IconButton>
					</Tooltip>
					<DialogContent className={classes.dialogContent}>
						{postDialog}
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

PostDialog.propTypes = {
  getPost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
	ui: PropTypes.object.isRequired,
	clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	post: state.data.post,
	ui: state.ui
});

const mapActionsToProps = {
	getPost,
	clearErrors
};

PostDialog.propTypes = {
	getPost: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostDialog));