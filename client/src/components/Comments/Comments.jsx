import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
// Libraries
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// Material-UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = () => ({
  commentImage: {
    maxWidth: '100%',
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%',
  },
  commentData: {
    marginLeft: 20,
  },
  invisibleSeparator: {
    border: 'none',
    margin: 4,
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20,
  },
});

const Comments = ({ classes, comments }) => {
  return (
    <Grid container>
      {comments.map((comment, index) => {
        const { body, createdAt, profileImage, userHandle } = comment;
        return (
          <Fragment key={createdAt}>
            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={2}>
                  <img
                    src={profileImage}
                    alt='comment'
                    className={classes.commentImage}
                  />
                </Grid>
                <Grid item sm={9}>
                  <div className={classes.commentData}>
                    <Typography
                      variant='h5'
                      component={Link}
                      to={`/users/${userHandle}`}
                      color='primary'>
                      {userHandle}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variabnt='body1'>{body}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {/* no separator for last comment */}
            {index !== comments.length - 1 && (
              <hr className={classes.visibleSeparator} />
            )}
          </Fragment>
        );
      })}
    </Grid>
  );
};

// Comments.propTypes = {
//   classes: PropTypes.object.isRequired,
//   comments: PropTypes.array.isRequired,
// };

export default withStyles(styles)(Comments);
