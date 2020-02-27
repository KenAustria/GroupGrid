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
					createdAt: doc.data().createdAt,
					likeCount: doc.data().likeCount,
					profileImage: doc.data().profileImage
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
		profileImage: req.user.profileImage,
		likeCount: 0,
		commentCount: 0,
		createdAt: new Date().toISOString()
	};

	// add newPost object to posts collection
	db.collection('posts')
		.add(newPost)
		.then(doc => {
			const resPost = newPost;
			resPost.postId = doc.id;
			res.json({resPost});
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

// Comment on a Post
exports.commentOnPost = (req, res) => {
  if (req.body.body.trim() === '') {
    return res.status(400).json({ comment: 'Cannot be empty' });
	}

  const newComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    postId: req.params.postId,
    userHandle: req.user.handle,
    profileImage: req.user.profileImage
  };

  db.doc(`/posts/${req.params.postId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Post does not exist.' });
			}
			// after gaining access to document, use prefix reference to update comment count
			return doc.ref.update({ commentCount: doc.data().commentCount + 1 })
		})
		.then(() => { // add newComment to comments collection
			return db.collection('comments').add(newComment);
		})
    .then(() => {
      res.json(newComment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
};

// Like a Post
exports.likePost = (req, res) => {
	// check if like document exist by accessing post liked by user
	const likeDocument = db
    .collection('likes')
    .where('userHandle', '==', req.user.handle)
    .where('postId', '==', req.params.postId)
    .limit(1);

	// check if post exist, can't like a nonexistent post
	const postDocument = db.doc(`/posts/${req.params.postId}`);
	let postData = {};

	// check if document exists, if so assign data and id to postData
	postDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        postData = doc.data();
        postData.postId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: 'Post does not exist.' });
      }
    })
		.then((data) => { // user has yet to like post if data array is empty; data: [ ]
      if (data.empty) {
        return db
          .collection('likes')
          .add({
            postId: req.params.postId,
            userHandle: req.user.handle
          })
          .then(() => {
            postData.likeCount++;
            return postDocument.update({ likeCount: postData.likeCount });
          })
          .then(() => {
            return res.json(postData);
          });
      } else {
        return res.status(400).json({ error: 'Post already liked' });
      }
    })
		.catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
}

// Unlike a Post
exports.unlikePost = (req, res) => {
	// check if like document exist by accessing post liked by user
	const likeDocument = db
    .collection('likes')
    .where('userHandle', '==', req.user.handle)
    .where('postId', '==', req.params.postId)
    .limit(1);

	// check if post exist, can't unlike a nonexistent post
	const postDocument = db.doc(`/posts/${req.params.postId}`);
	let postData = {};

	// check if document exists, if so assign data and id to postData
	postDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        postData = doc.data();
        postData.postId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: 'Post does not exist.' });
      }
    })
		.then((data) => { // empty data means post is not liked yet
      if (data.empty) {
        return res.status(400).json({ error: 'Cannot unlike a post that is not first liked.' });
      } else { // post has been liked, let's unlike the post decrementing like count and deleting document
        return db
          .doc(`/likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            postData.likeCount--;
            return postDocument.update({ likeCount: postData.likeCount });
          })
          .then(() => {
            res.json(postData);
          });
      }
    })
		.catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
}

// Delete a Post
exports.deletePost = (req, res) => {
	// access document and save to a reference
	const document = db.doc(`/posts/${req.params.postId}`);

	// checks before deleting post
	document
    .get()
    .then((doc) => { // cannot delete a non-existing post
      if (!doc.exists) {
        return res.status(404).json({ error: 'Post not found' });
      } // only user can delete their own post
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: 'Unauthorized' });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: 'Post deleted successfully' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};