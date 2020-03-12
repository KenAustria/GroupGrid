import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// Material-UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// Redux
import { connect } from 'react-redux';
import { submitComment } from '../../store/actions/dataActions';

const styles = {
	textField: {
    margin: '10px auto 10px auto'
	},
	button: {
    marginTop: 20,
    float: 'right'
	}
};

class CommentForm extends Component {
	state = {
		body: '',
		errors: {}
	}

	componentWillReceiveProps(nextProps) {
    if (nextProps.ui.errors) {
      this.setState({ errors: nextProps.ui.errors });
    }
    if (!nextProps.ui.errors && !nextProps.ui.loading) {
      this.setState({ body: '' });
    }
  }

	inputChangeHandler = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	submitHandler = (event) => {
		event.preventDefault();
		this.props.submitComment( this.props.postId, { body: this.state.body });
	};

	render() {
		const { classes, authenticated } = this.props;
		const errors = this.state.errors;
		const commentForm = authenticated ? (
      <Grid item sm={12} style={{ textAlign: 'center' }}>
        <form onSubmit={this.submitHandler}>
          <TextField
            name='body'
            type='text'
            label='Comment on Post'
            error={errors.comment ? true : false}
            helperText={errors.comment}
            value={this.state.body}
            onChange={this.inputChangeHandler}
            fullWidth
            className={classes.textField}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
          >
            Submit
          </Button>
        </form>
      </Grid>
    ) : null;
    return commentForm;
	}
}

const mapStateToProps = (state) => ({
	ui: state.ui,
	authenticated: state.user.authenticated
});

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm));