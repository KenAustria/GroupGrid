const functions = require('firebase-functions');
const express = require('express');
const app = express();
const { getPosts, createPost } = require('./handlers/posts');
const { signup } = require('./handlers/users');

// Posts Routes
app.get('/posts', getPosts);
app.post('/post', createPost);

// User Routes
app.post('/signup', signup);

// api prefix to tell firebase that app contains the routes
exports.api = functions.https.onRequest(app);