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
		postIdParam: null
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

	render() {
		const { posts, loading } = this.props.data;
		const { postIdParam } = this.state;

		const userProfile = loading ? (
      <p>Loading data...</p>
    ) : posts === null ? (
      <p>No posts from this user</p>
    ) : !postIdParam ? (
      posts.map((post) => <Post key={post.postId} post={post} />)
		) : (
			posts.map((post) => {
				if (post.postId !== postIdParam)
					return <Post key={post.postId} post={post} />;
				else return <Post key={post.postId} post={post} openDialog />;
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
	getUserProfile: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getUserProfile })(UserProfile);