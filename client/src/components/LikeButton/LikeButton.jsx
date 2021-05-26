import React from "react";
import MyButton from "../MyButton";
// Redux Toolkit
import { likePost, unlikePost } from "../../features/data/dataSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// Libraries
import { BrowserRouter as Router } from "react-router-dom";
// Material-UI
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const LikeButton = () => {
  const authenticated = useSelector((state) => state.users.authenticated);
  const dispatch = useDispatch();

  const handleLikeCheck = () => {
    if (user.likes && user.likes.find((like) => like.postId === postId)) {
      return true;
    } else return false;
  };

  const handleLikePost = () => {
    dispatch(likePost(postId));
  };

  const handleUnlikePost = () => {
    dispatch(unlikePost(postId));
  };

  const likeButton = !authenticated ? (
    <Router>
      <Link to='/login'>
        <MyButton title='Like'>
          <FavoriteBorder color='primary' data-testid='favorite-icon' />
        </MyButton>
      </Link>
    </Router>
  ) : handleLikeCheck() ? (
    <Router>
      <MyButton alt='Unlike' title='Unlike' onClick={handleUnlikePost}>
        <FavoriteIcon color='primary' />
      </MyButton>
    </Router>
  ) : (
    <Router>
      <MyButton title='Like' onClick={handleLikePost}>
        <FavoriteBorder color='primary' />
      </MyButton>
    </Router>
  );
  return likeButton;
};

export default LikeButton;
