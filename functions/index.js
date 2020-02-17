const functions = require('firebase-functions');
const express = require('express');
const app = express();
const { getPosts, createPost } = require('./handlers/posts');

// Posts Routes
app.get('/posts', getPosts);
app.post('/post', createPost);

// api prefix to tell firebase that app contains the routes
exports.api = functions.https.onRequest(app);