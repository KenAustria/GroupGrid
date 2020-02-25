/* eslint-disable promise/always-return */
const functions = require('firebase-functions');
const express = require('express');
const app = express();
const firebaseAuth = require('./utilities/firebaseAuth');
const { db } = require('./utilities/admin');
const { getPosts, createPost, getPost, commentOnPost, likePost, unlikePost, deletePost } = require('./handlers/posts');
const { signup, login, uploadProfileImage, addUserDetails, getUserDetails } = require('./handlers/users');

// Posts Routes
app.get('/posts', getPosts);
app.post('/post', firebaseAuth, createPost);
app.get('/post/:postId', getPost);
app.post('/post/:postId/comment', firebaseAuth, commentOnPost);
app.get('/post/:postId/like', firebaseAuth, likePost);
app.get('/post/:postId/unlike', firebaseAuth, unlikePost);
app.delete('/post/:postId', firebaseAuth, deletePost);

// User Routes
app.post('/signup', signup);
app.get('/login', login);
app.post('/user/profileImage', firebaseAuth, uploadProfileImage);
app.post('/user', firebaseAuth, addUserDetails);
app.get('/user', firebaseAuth, getUserDetails);

// api prefix to tell firebase that app contains the routes
exports.api = functions.https.onRequest(app);

// Create a notification when user has liked a post.
exports.createNotificationOnLike = functions
  .firestore.document('likes/{id}') // access like id from likes document
  .onCreate(snapshot => {
    db.doc(`/posts/${snapshot.data().postId}`) // access postId from post snapshot when created
      .get()
      .then(doc => {
        if (doc.exists) { // create a notification if document exist
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: 'like',
            read: false, // default to unread
            postId: doc.id
          });
        }
      })
      .then(() => { // promise holds a write result, but not needed so just return
        return;
      })
      .catch(err => {
        console.error(err);
        return; // response not needed for return as it’s a db trigger not api endpoint
      });
	});

// Create a notification when a user has commented on a post.
exports.createNotificationOnComment = functions
	.firestore.document('comments/{id}') // access like id from likes document
  .onCreate((snapshot) => { // access postId from post snapshot when document is created to access data
    db.doc(`/posts/${snapshot.data().postId}`)
      .get()
      .then((doc) => {
        if (doc.exists) { // create a notification if document exist
          return db.doc(`/notifications/${snapshot.id}`).set({ // like and comment share same snapshot id
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: 'comment',
            read: false, // default to unread
            postId: doc.id
          });
        }
      })
      .then(() => { // promise holds a write result, but not needed so just return
        return;
      })
      .catch((err) => {
        console.error(err);
        return; // response not needed for return as it’s a db trigger not api endpoint
      });
	});

	// Delete notification if user removes their original like by unliking
exports.deleteNotificationOnUnLike = functions
.firestore.document('likes/{id}') // access like id from likes document
.onDelete((snapshot) => {
	db.doc(`/notifications/${snapshot.id}`)
		.delete()
		.then(() => { // result not needed so leave argument empty
			return;
		})
		.catch((err) => {
			console.error(err);
			return;
		});
});