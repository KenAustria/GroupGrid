const { admin, db } = require('../utilities/admin');

// Get Posts
exports.getPosts = (req, res) => {
	// access posts collection
	db.collection('posts')
		.orderBy('createdAt', 'desc')
		.get()
		.then(data => {
			let posts = []; // declare host array
			data.forEach(doc => { // iterate each document of data and insert into array
				posts.push({ // push object with these attributes
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

// Create a Post
exports.createPost = (req, res) => {
	// newPost object's properties
	const newPost = {
		body: req.body.body,
		userHandle: req.user.handle,
		createdAt: admin.firestore.Timestamp.fromDate(new Date())
	};

	// add newPost object to posts collection
	db.collection('posts')
		.add(newPost)
		.then(doc => {
			return res.json({ message: 'Document created successfully.' });
		})
		.catch(err => {
			res.status(500).json({ error: 'Something went wrong.' });
			console.error(err);
		});
};

// Get a Post
exports.getPost = (req, res) => {
  let postData = {}; // declare empty post object
  db.doc(`/posts/${req.params.postId}`) // access post by post id
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Post does not exist.' });
      }
      postData = doc.data(); // assign returned data to references
      postData.postId = doc.id;
      return db
				.collection('comments')
				.orderBy('createdAt', 'desc')
        .where('postId', '==', req.params.postId)
        .get();
    })
    .then(data => {
      postData.comments = []; // list comments
      data.forEach((doc) => {
        postData.comments.push(doc.data());
      });
      return res.json(postData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};