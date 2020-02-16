const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.getPosts = functions.https.onRequest((req, res) => {
	admin // access posts collection
		.firestore()
		.collection('posts')
		.get()
		.then(data => {
			let posts = []; // declare host array
			data.forEach(doc => { // iterate each document of data and insert into array
				posts.push(doc.data());
			});
			return res.json(posts);
		})
		.catch(err => console.error(err));
});

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