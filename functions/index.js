const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.getPosts = functions.https.onRequest((req, res) => {
	admin // access posts collection
		.firestore()
		.collection('posts')
		.get()
		.then((data) => {
			let posts = []; // declare host array
			data.forEach((doc) => { // iterate each document of data and insert into array
				posts.push(doc.data());
			});
			return res.json(posts);
		})
		.catch((err) => console.error(err));
})