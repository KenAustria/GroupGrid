import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// Material-UI
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
// Redux
import { connect } from 'react-redux';
import { createPost } from '../../store/actions/dataActions';

const styles = {
	submitButton: {
    position: 'relative'
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  }
};

class CreatePost extends Component {
	state = {
		open: false,
		errors: {},
		body: ''
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		// check for errors
		if (nextProps.ui.errors) {
      this.setState({
        errors: nextProps.ui.errors
      });
		}
		// if there aren't any errors and loading has completed
    if (!nextProps.ui.errors && !nextProps.ui.loading) {
      this.setState({ body: '' });
      this.closeHandler();
    }
  }

	openHandler = () => {
		this.setState({ open: true });
	};

	closeHandler = () => {
		this.setState({ open: false, errors: {} });
	};

	inputChangeHandler = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	submitHandler = (event) => {
		event.preventDefault();
		this.props.createPost({ body: this.state.body });
	};

	render() {
		const { errors } = this.state;
		const {
      classes,
      ui: { loading }
    } = this.props;
		return (
			<Fragment>
				<Tooltip title='Create a Post'>
					<IconButton onClick={this.openHandler}>
						<AddIcon color='secondary' />
					</IconButton>
				</Tooltip>
				<Dialog open={this.state.open} onClose={this.closeHandler} fullWidth maxWidth='sm'>
					<Tooltip title='Cancel' onClose={this.closeHandler}>
						<IconButton className={classes.closeButton}>
							<CloseIcon color='secondary' />
						</IconButton>
					</Tooltip>
					<DialogTitle>Create a Post</DialogTitle>
					<DialogContent>
						<form onSubmit={this.submitHandler}>
							<TextField
								name='body'
                type='text'
                label='Share your thoughts..'
                multiline
                rows='3'
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.inputChangeHandler}
                fullWidth
							/>
							<Button type='submit' variant='contained' color='primary' className={classes.submitButton} disabled={loading} >
								Submit
								{loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

const mapActionsToProps = {
	createPost
}

const mapStateToProps = (state) => ({
  ui: state.ui
});

CreatePost.propTypes = {
	createPost: PropTypes.func.isRequired,
	ui: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CreatePost));