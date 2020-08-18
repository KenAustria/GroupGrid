import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// Material-UI
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
// Redux
import { connect } from 'react-redux';
import { deletePost } from '../../store/actions/dataActions';

const styles = {
  deleteButton: {
    position: 'absolute',
    left: '80%'
  }
};
class DeletePost extends Component {
	state = {
    open: false
  };

	openHandler = () => {
		this.setState({ open: true })
	};

	closeHandler = () => {
		this.setState({ open: false })
	};

	deletePostHandler = () => {
		this.props.deletePost(this.props.postId);
		this.setState({ open: false })
	};

	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<Tooltip title='Delete a Post'>
					<IconButton onClick={this.openHandler} className={classes.deleteButton}>
						<DeleteOutline color='secondary' data-testid='delete-icon'/>
					</IconButton>
				</Tooltip>
        <Dialog open={this.state.open} onClose={this.closeHandler} fullWidth maxWidth='sm'>
          <DialogTitle>
            Are you sure you want to delete this post?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.closeHandler} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.deletePostHandler} color='secondary'>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
		);
	}
}

const mapActionsToProps = {
	deletePost
}

DeletePost.propTypes = {
	deletePost: PropTypes.func.isRequired,
	postId: PropTypes.string.isRequired
};

export default connect(null, mapActionsToProps)(withStyles(styles)(DeletePost));