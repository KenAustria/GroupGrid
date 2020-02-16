const functions = require('firebase-functions');
const express = require('express');
const app = express();
const { getPosts } = require('./handlers/posts');

// Posts Routes
app.get('/posts', getPosts);

exports.createPost = functions.https.onRequest((req, res) => {
	// prevent client error
	if (req.method !== 'POST') {
		return res.status(400).json({ error: "Only POST Request Allowed."});
	}

	// newPost object's properties
	const newPost = {
		body: req.body.body,
		userHandle: req.body.userHandle,
		createdAt: admin.firestore.Timestamp.fromDate(new Date())
	};

	// add newPost object to posts collection
	admin
		.firestore()
		.collection('posts')
		.add(newPost)
		.then(doc => {
			return res.json({ message: "Document created successfully." });
		})
		.catch(err => {
			res.status(500).json({ error: "Something went wrong."});
			console.error(err);
		});
});

// api prefix to tell firebase that app contains the routes
exports.api = functions.https.onRequest(app);