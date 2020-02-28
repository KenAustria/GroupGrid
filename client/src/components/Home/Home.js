import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';

class Home extends Component {
	render() {
		return (
			<div>
				<Grid container spacing={16}>
					<Grid sm={4} xl={12}>
						<p>Profile</p>
					</Grid>
					<Grid sm={8} xl={12}>
						<p>Posts</p>
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default Home; 