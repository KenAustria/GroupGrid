const functions = require('firebase-functions');
const express = require('express');
const app = express();
const firebaseAuth = require('./utilities/firebaseAuth');
const { getPosts, createPost } = require('./handlers/posts');
const { signup, login, uploadProfileImage, addUserDetails } = require('./handlers/users');

// Posts Routes
app.get('/posts', getPosts);
app.post('/post', firebaseAuth, createPost);

// User Routes
app.post('/signup', signup);
app.get('/login', login);
app.post('/user/profileImage', firebaseAuth, uploadProfileImage);
app.post('/user', firebaseAuth, addUserDetails)

// api prefix to tell firebase that app contains the routes
exports.api = functions.https.onRequest(app);