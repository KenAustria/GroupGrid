import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

class Post extends Component {
	render() {
		dayjs.extend(relativeTime);
		const {
      post: {
        body,
        createdAt,
        profileImage,
        userHandle,
        likeCount,
        commentCount
      }
    } = this.props;
		return (
			<Card className='card'>
				<CardHeader
					avatar={<Avatar alt='Profile Image' src={profileImage} />}
					title={userHandle}
					subheader={dayjs(createdAt).fromNow()}
					component={Link}
					to={`/users/${userHandle}`}
				/>
				<CardContent className='content'>
					<Typography>{body}</Typography>
					<Typography>{likeCount}</Typography>
					<Typography>{commentCount}</Typography>
				</CardContent>
    	</Card>
		)
	}
}

export default Post;