import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StaticProfile from '../StaticProfile/StaticProfile';
import Post from '../Post/Post';
// Libraries
import axios from 'axios';
// Material-UI
import Grid from '@material-ui/core/Grid';
// Redux
import { connect } from 'react-redux';
import { getUserProfile } from '../../store/actions/userActions';

class UserProfile extends Component {
	state = {
		profile: null,
		postIdParam: null,
		dialogOpened: true
	}

	componentDidMount() {
		const handle = this.props.match.params.handle;
		const postId = this.props.match.params.postId;
		if (postId) {
			this.setState({
				postIdParam: postId
			});
		}
		this.props.getUserProfile(handle);
		axios
			.get(`/user/${handle}`)
			.then(res => {
				this.setState({
					profile: res.data.user
				})
			})
			.catch(err => {
				console.log(err);
			})
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.match !== this.props.match) {
      const postId = nextProps.match.params.postId;
      if (postId)
        this.setState({ postIdParam: postId, openDialog: true });
    }
  }

	openDialogHandler = () => {
		this.setState(prevState => ({
			dialogOpened: !prevState.dialogOpened
		}));
	}

	render() {
		const { posts, loading } = this.props.data;
		const { postIdParam } = this.state;

		const userProfile = loading ? (
      <p>Loading data...</p>
    ) : posts === null ? ( // if not loading, but user does not have any posts
      <p>No posts from this user</p>
    ) : !postIdParam ? (
      posts.map((post) => <Post key={post.postId} post={post} />) // if not loading && posts aren't empty && postIdParam IS null, do nothing
		) : (
			posts.map((post) => { // if not loading && posts aren't empty && postIdParam IS NOT null
				if (post.postId !== postIdParam) // if the post isn't the one we're looking for, do nothing
					return <Post key={post.postId} post={post} />;
				else return <Post key={post.postId} post={post} openDialog={this.openDialogHandler} />; // we find the post we want opened so we pass it the `openDialog` prop
			})
		);

		return (
			<Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <p>Loading profile...</p>
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
				<Grid item sm={8} xs={12}>
          {userProfile}
        </Grid>
      </Grid>
		);
	}
}

const mapStateToProps = (state) => ({
	data: state.data
});

UserProfile.propTypes = {
	data: PropTypes.object.isRequired,
	getUserProfile: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getUserProfile })(UserProfile);