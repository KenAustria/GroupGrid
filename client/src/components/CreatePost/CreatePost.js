import React, { Component, Fragment } from 'react';
import MyButton from '../MyButton/MyButton';
import PropTypes from 'prop-types';
// Material-UI
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
// Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
// Redux
import { connect } from 'react-redux';
import { createPost, clearErrors } from '../../store/actions/dataActions';

const styles = {
	submitButton: {
    marginRight: 16,
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%'
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
      this.setState({ body: '', open: false, errors: {} });
    }
  }

	openHandler = () => {
		this.setState({ open: true });
	};

	closeHandler = () => {
		this.props.clearErrors();
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
				<MyButton title='Create a Post' onClick={this.openHandler}>
					<AddIcon color='secondary' />
        </MyButton>
				<Dialog open={this.state.open} onClose={this.closeHandler} fullWidth maxWidth='sm'>
					<MyButton title='Cancel' onClose={this.closeHandler} tipClassName={classes.closeButton}>
						<CloseIcon color='secondary' />
        	</MyButton>
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
						</form>
					</DialogContent>
					<DialogActions>
						<Button type='submit' variant='contained' color='primary' className={classes.submitButton} disabled={loading} >
							Submit
							{loading && (
								<CircularProgress
									size={30}
									className={classes.progressSpinner}
								/>
							)}
						</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
  ui: state.ui
});

CreatePost.propTypes = {
	createPost: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	ui: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {createPost, clearErrors})(withStyles(styles)(CreatePost));