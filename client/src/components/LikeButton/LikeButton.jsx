import React from 'react';
import MyButton from '../../utils/MyButton';
// import PropTypes from 'prop-types';
// Redux Toolkit
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../../features/data/dataSlice';
// Libraries
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// Material-UI
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const LikeButton = ({ postId }) => {
  const authenticated = useSelector(state => state.users.authenticated);
  const likes = useSelector(state => state.users.likes);
  const dispatch = useDispatch();

  const handleLikeCheck = () => {
    if (likes && likes.find(like => like.postId === postId)) {
      return true;
    } else return false;
  };

  const handleLikePost = () => dispatch(likePost(postId));
  const handleUnlikePost = () => dispatch(unlikePost(postId));

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

// LikeButton.propTypes = {
//   likePost: PropTypes.func.isRequired,
//   unlikePost: PropTypes.func.isRequired,
//   authenticated: PropTypes.bool.isRequired,
//   likes: PropTypes.array.isRequired,
//   postId: PropTypes,
// };

export default LikeButton;
