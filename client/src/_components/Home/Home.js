import React, { Component } from 'react';
import Profile from '../Profile/Profile';
import PropTypes from 'prop-types';
import Post from '../Post/Post';
// Libraries
import { BrowserRouter as Router } from 'react-router-dom';
// Material-UI
import Grid from '@material-ui/core/Grid';
// Redux
import { connect } from 'react-redux';
import { getPosts } from '../../_store/actions/dataActions';

class Home extends Component {
	componentDidMount = () => {
		this.props.getPosts();
	}

	render() {
		const { posts, loading } = this.props.data;
    let currentPosts = loading ? (
      <p>Loading..</p>
    ) : (
      posts.map(post => <Post key={post.postId} post={post} />)
    );
		return (
			<Router>
				<Grid container spacing={2}>
					<Grid item sm={4} xl={12}>
						<Profile />
					</Grid>
					<Grid item sm={8} xl={12}>
						{currentPosts}
					</Grid>
				</Grid>
			</Router>
		)
	}
}

const mapStateToProps = (state) => ({
  data: state.data
});

const mapActionsToProps = {
  getPosts
};

Home.propTypes = {
	getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(Home);