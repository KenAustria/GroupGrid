const functions = require('firebase-functions');
const express = require('express');
const app = express();
const firebaseAuth = require('./utilities/firebaseAuth');
const { getPosts, createPost, getPost, commentOnPost, likePost } = require('./handlers/posts');
const { signup, login, uploadProfileImage, addUserDetails, getUserDetails } = require('./handlers/users');

// Posts Routes
app.get('/posts', getPosts);
app.post('/post', firebaseAuth, createPost);
app.get('/post/:postId', getPost);
app.post('/post/:postId/comment', firebaseAuth, commentOnPost);
app.get('/post/:postId/like', firebaseAuth, likePost);

// User Routes
app.post('/signup', signup);
app.get('/login', login);
app.post('/user/profileImage', firebaseAuth, uploadProfileImage);
app.post('/user', firebaseAuth, addUserDetails);
app.get('/user', firebaseAuth, getUserDetails);

// api prefix to tell firebase that app contains the routes
exports.api = functions.https.onRequest(app);