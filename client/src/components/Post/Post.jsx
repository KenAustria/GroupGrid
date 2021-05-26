import React from "react";
import LikeButton from "../LikeButton";
// Redux Toolkit
import { useSelector } from "react-redux";
// Libraries
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// Material-UI
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import ChatIcon from "@material-ui/icons/Chat";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: "20px",
  },
  content: {
    padding: "25px",
    objectFit: "cover",
  },
  avatar: {
    width: 70,
    height: 70,
  },
};

const Post = ({ classes }) => {
  dayjs.extend(relativeTime);
  const post = useSelector((state) => state.data.post);
  const authenticated = useSelector((state) => state.user.authenticated);
  const credentials = useSelector((state) => state.user.credentials);

  const deleteButton =
    authenticated && userHandle === credentials.handle ? (
      <DeletePost postId={postId} />
    ) : null;

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <CardHeader
          avatar={
            <Avatar
              alt='Profile Image'
              src={post.profileImage}
              className={classes.avatar}
            />
          }
          title={post.userHandle}
          subheader={dayjs(post.createdAt).fromNow()}
          component={Link}
          to={`/users/${post.userHandle}`}
        />
        <Typography variant='body1'>{post.body}</Typography>
        <LikeButton postId={post.postId} />
        <span>{post.likeCount} Likes</span>
        <MyButton title='Comments'>
          <ChatIcon color='primary' />
        </MyButton>
        <span>{post.commentCount} Comments</span>
        {/* <PostDialog postId={post.postId} userHandle={post.userHandle} openDialog={openDialog} /> */}
        {deleteButton}
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(Post);
