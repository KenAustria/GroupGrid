import React, { Component } from 'react';
import Post from '../Post/Post';
import axios from 'axios';
// Material-UI
import Grid from '@material-ui/core/Grid';

class Home extends Component {
	state = {
		posts: null
	}

	componentDidMount = () => {
		axios
			.get('/posts')
			.then(res => {
				console.log(res.data);
				this.setState({
					posts: res.data
				})
			})
			.catch(err => console.log(err));
	}

	render() {
		let posts = this.state.posts ? (
      this.state.posts.map((post, index) => <Post post={post} key={index} />)
    ) : (
      <p>Loading...</p>
		);
		return (
			<Grid container spacing={2}>
				<Grid item sm={4} xl={12}>
					<p>Profile</p>
				</Grid>
				<Grid item sm={8} xl={12}>
					{posts}
				</Grid>
			</Grid>
		)
	}
}

export default Home;