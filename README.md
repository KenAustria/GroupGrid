# Group Grid

Social media application implemented with the React library and REST interfaces supported by Firebase cloud functions. [Live Link](https://groupgrid-1d191.firebaseapp.com/)

## Technologies

• React  
• Redux  
• Firebase Cloud Functions  
• Material-UI

## Features

• Users can log in to view posts.  
• Users can edit their own profile details including bio, location, and image.  
• Users can like and comment on another user's post.  
• User A will receive a notification when User B either likes or comments on User A's post.  
• Users can create a post and delete their created post.

---

## Highlight Demonstrations

### ⭐ Users can edit their own profile details including profile image, bio, and location.

Upon signup, users are assigned a default profile photo.  
  
  ![](https://media.giphy.com/media/KDnNpMilvSE02QkHPr/giphy.gif)  
```
// Upload Profile Image
exports.uploadProfileImage = (req, res) => {
  ...
	busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
		if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
			return res.status(400).json({ error: 'Wrong file type submitted' });
		}

		const imageExtension = filename.split('.').pop();
		imageFileName = `${Math.round(Math.random() * 100000000000)}.${imageExtension}`;
		const filepath = path.join(os.tmpdir(), imageFileName);
		imageToBeUploaded = { filepath, mimetype };
		file.pipe(fs.createWriteStream(filepath));
	});

	busboy.on('finish', () => {
		admin
			.storage()
			.bucket(`${firebaseConfig.storageBucket}`)
			.upload(imageToBeUploaded.filepath, {
				resumable: false,
				metadata: {
					metadata: {
						contentType: imageToBeUploaded.mimetype
					}
				}
			})
			.then(() => {
				const profileImage = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media`;
				return db.doc(`/users/${req.user.handle}`).update({ profileImage });
			})
			.then(() => {
				return res.json({ message: 'Image uploaded successfully' });
			})
			.catch(err => {
				console.error(err);
				return res.status(500).json({ error: err.code });
			});
	});
  ...
}
```

The bio, website, and location fields are empty when a user first signs up. A user will be to edit their profile details, once authenticated. The website field validates if user's input is a valid website.  
![](https://media.giphy.com/media/L0BAzmHxvWUveIncm0/giphy.gif)  
```
// Add User's Details
exports.addUserDetails = (req, res) => {
	// assign values returned from validator
	let userDetails = reduceUserDetails(req.body);

	// access user’s object in db and update with user’s details
  db.doc(`/users/${req.user.handle}`)
    .update(userDetails)
    .then(() => {
      return res.json({ message: 'Details added successfully' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
```

### ⭐ Users can like and comment on another user’s post.

Once authenticated, a user is able to like and unlike a post that they do not own.  
A user is also able to comment on another user's post, then their comment is rendered descendingly from the time it was created.

![](https://media.giphy.com/media/Qyo61X7Qj72YSvT6fT/giphy.gif)

```
// Comment on a Post
exports.commentOnPost = (req, res) => {
  ...
  db.doc(`/posts/${req.params.postId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Post does not exist.' });
			}
			return doc.ref.update({ commentCount: doc.data().commentCount + 1 })
		})
		.then(() => {
			return db.collection('comments').add(newComment);
		})
    .then(() => {
      res.json(newComment);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
};
```

### ⭐ UserA will receive a notification when UserB either likes or comments on UserA's post.

When a user likes or comments on another user's post, the owner of the post will receive individual notifications for their post being liked and commented on. The notifications will be rendered descendingly from the time the action occurred.   
When the owner of the post clicks on a notification, it will lead him to his profile page with the post dialog opened.  

![](https://media.giphy.com/media/iHyE0SnwgaGaWPg15J/giphy.gif)

```
// Mark a Notification as Read
exports.markNotificationsRead = (req, res) => {
	// if user has unread notifications, client will send an array of notifications that have been read,
	// so that server can update it's list of notifications
  let batch = db.batch(); // using batch to update multiple documents
  req.body.forEach((notificationId) => { // iterate each notification of body array
    const notification = db.doc(`/notifications/${notificationId}`);
    batch.update(notification, { read: true }); // update multiple documents to true
  });
  batch
    .commit()
    .then(() => {
      return res.json({ message: 'Notifications marked read' });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
```

## Roadmap

• Users can upload an image along with the post.  
• Users can follow and unfollow each other.
