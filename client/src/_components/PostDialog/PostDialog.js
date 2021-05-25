import React, { Component, Fragment } from 'react';
import LikeButton from '../LikeButton/LikeButton';
import Comments from '../Comments/Comments';
import CommentForm from '../CommentForm/CommentForm';
import MyButton from '../MyButton/MyButton';
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
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';
import { getPost, clearErrors } from '../../_store/actions/dataActions';

const styles = () => ({
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  },
	invisibleSeparator: {
    border: 'none',
    margin: 4
	},
	visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20
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
	expandButton: {
    position: 'absolute',
    left: '90%'
	}
});

class PostDialog extends Component {
	state = {
		open: false,
		oldUrl: '',
		newUrl: '',
		getPostData: false
	}

	componentDidMount() {
		if (this.props.openDialog && !this.state.getPostData) {
			this.setState({ getPostData: true });
			this.openHandler();
		}
	}

	componentDidUpdate(prevProps) {
		if ((this.props.openDialog) && (this.props.user.notificationId !== prevProps.user.notificationId)) {
			this.openHandler();
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.openDialog && !this.state.getPostData) {
      this.setState({ getPostData: true });
      this.openHandler();
    }
	}

	openHandler = () => {
		let oldUrl = window.location.pathname;
		const { userHandle, postId } = this.props;
		let newUrl = `/users/${userHandle}/post/${postId}`;

		// case if pastes url, therefore no previous url path
		if (oldUrl === newUrl) {
			oldUrl = `/users/${userHandle}`;
		}

		window.history.pushState(null, null, newUrl);
		this.setState({ open: true, oldUrl, newUrl });
		this.props.getPost(this.props.postId);
	};

	closeHandler = () => {
		// revert back to oldUrl
		window.history.pushState(null, null, this.state.oldUrl);
		this.setState({ 
			open: false,
			getPostData: false
		 });
		this.props.clearErrors();
	};

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
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
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
					<MyButton title='Comments' onClick={this.openHandler} className={classes.expandButton}>
						<ChatIcon color='primary' />
          </MyButton>
					<span>{commentCount} Comments</span>
        </Grid>
				<CommentForm postId={postId} />
        <Comments comments={comments} />
      </Grid>
		);

		return (
			<Fragment>
				<MyButton title='Expand Post' onClick={this.openHandler} className={classes.expandButton}>
					<UnfoldMore color='primary' data-testid='unfold-icon'/>
        </MyButton>
				<Dialog open={this.state.open} onClose={this.closeHandler} fullWidth maxWidth='sm'>
					<DialogContent className={classes.dialogContent}>
						<MyButton title='Close' onClick={this.closeHandler}>
							<CloseIcon />
        		</MyButton>
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
	user: PropTypes.object.isRequired,
	clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	post: state.data.post,
	ui: state.ui,
	user: state.user.notifications
});

const mapActionsToProps = {
	getPost,
	clearErrors
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostDialog));