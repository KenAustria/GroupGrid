const { db } = require('../utilities/admin');

// Get Posts
exports.getPosts = (req, res) => {
	db // access posts collection
		.collection('posts')
		.orderBy('createdAt', 'desc')
		.get()
		.then(data => {
			let posts = []; // declare host array
			data.forEach(doc => { // iterate each document of data and insert into array
				posts.push(doc.data());
				posts.push({
					postId: doc.id,
					userHandle: doc.data().userHandle,
					body: doc.data().body,
					createdAt: doc.data().createdAt
				});
			});
			return res.json(posts);
		})
		.catch((err) => console.error(err));
};