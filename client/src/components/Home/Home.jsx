import React, { useState, useEffect } from "react";
import Post from "../Post";
// Material-UI
import Grid from "@material-ui/core/Grid";
// Libraries
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/posts");
      setPosts(result.data);
    };

    fetchData();
  });

  let recentPostsMarkup = posts ? (
    posts.map((post) => <Post key={post.postId} post={post} />)
  ) : (
    <p>Loading..</p>
  );

  return (
    <Router>
      <Grid container spacing={2}>
        <Grid item sm={4} xl={12}>
          <p>Profile</p>
        </Grid>
        <Grid item sm={8} xl={12}>
          {recentPostsMarkup}
        </Grid>
      </Grid>
    </Router>
  );
};

export default Home;
