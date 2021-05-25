import React from "react";
// Material-UI
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
// Libraries
import { Link } from "react-router-dom";
// import dayjs from "dayjs";

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

const Post = ({ classes, post }) => {
  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <CardHeader
          avatar={<Avatar alt='Profile Image' src={post.profileImage} />}
          title={post.userHandle}
          // subheader={dayjs(post.createdAt).fromNow()}
          component={Link}
          to={`/users/${post.userHandle}`}
        />
        <Typography variant='body1'>{post.body}</Typography>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(Post);
