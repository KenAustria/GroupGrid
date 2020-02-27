const { admin, db } = require('../utilities/admin');
const firebaseConfig = require('../utilities/firebaseConfig');
const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);
const { validateSignup, validateLogin, reduceUserDetails } = require('../utilities/validators');

// Signup a User
exports.signup = (req, res) => {
	// extract form data from request body
	const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
	};

	// handle errors
	const { errors, valid } = validateSignup(newUser);
	if (!valid) return res.status(400).json(errors);

	// upon user signup, assign user a default profile image
	const noImg = 'no-img.png';

	// host variables for access
	let token, userId;

	// validate data
	// access user's document by handle
	db.doc(`/users/${newUser.handle}`)
    .get()
    .then(doc => {
      if (doc.exists) { // conditional if handle is used
        return res.status(400).json({ handle: 'Handle already exist.' });
      } else {
        return firebase // else, sign up user to firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
		.then(data => { // user is now created, access data to return auth token
      userId = data.user.uid;
      return data.user.getIdToken();
    })
		.then(idToken => { // create user document
			token = idToken;
			const userCredentials = {
				handle: newUser.handle,
				email: newUser.email,
				createdAt: new Date().toISOString(),
				profileImage: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${noImg}?alt=media`,
				userId
			};
			// persist credentials in document of users collection
			return db.doc(`/users/${newUser.handle}`).set(userCredentials);
		})
		.then(() => { // return result
			return res.status(201).json({ token });
		})
		.catch(err => {
			console.error(err);
			// conditional if email is used
			if (err.code === `auth/email-already-in-use`) {
				return res.status(400).json({ email: 'Email already exist.' });
			} else return res.status(500).json({ error: err.code }); // catch server error
		})
};

// Login a User
exports.login = (req, res) => {
	// extract form data from request body
	const user = {
		email: req.body.email,
		password: req.body.password
	}

	// handle errors
	const { errors, valid } = validateLogin(user);
	if (!valid) return res.status(400).json(errors);

	// login user to firebase
	firebase
		.auth()
		.signInWithEmailAndPassword(user.email, user.password)
		.then(data => { // user is now logged in, access data to return token
			return data.user.getIdToken();
		})
		.then(token => {
			return res.json({ token })
		})
		.catch(err => {
			console.error(err)
			// conditional if email is used
			if(err.code === 'auth/wrong-password') {
				return res.status(403).json({ general: 'Wrong credentials, please try again.'});
			} else return res.status(500).json({ error: err.code }); // catch server error
		});
}

// Upload Profile Image
exports.uploadProfileImage = (req, res) => {
	// declare imports
	const BusBoy = require('busboy');
	const path = require('path');
	const os = require('os');
	const fs = require('fs');

	// instantiated an instance of BusBoy option headers
	const busboy = new BusBoy({ headers: req.headers });

	// host constants
	let imageFileName;
	let imageToBeUploaded = {};

	// define file event with list of handlers as parameters
	busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
		// if the uploaded file isn't a jpeg or png file, return error
		if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
			return res.status(400).json({ error: 'Wrong file type submitted' });
		}

		// file name with multiple dot notation; my.image.png
		const imageExtension = filename.split('.').pop();
		// create random image file name; 2938573496709524286434.png
		imageFileName = `${Math.round(Math.random() * 100000000000)}.${imageExtension}`;
		// access file path, tempdir was used because you cant persist files when using functions.
		const filepath = path.join(os.tmpdir(), imageFileName);
		// create the image to be
		imageToBeUploaded = { filepath, mimetype };
		// use file system library to create file
		file.pipe(fs.createWriteStream(filepath));
	});

	// finish event
	busboy.on('finish', () => {
		// upload imageToBeUploaded with filepath and options object
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
			}) // construct image url to add to user
			.then(() => {
				const profileImage = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media`; // alt media to show on browser
				return db.doc(`/users/${req.user.handle}`).update({ profileImage }); // access document of request.user and update profileImage with value of profileImage
			})
			.then(() => {
				return res.json({ message: 'Image uploaded successfully' }); // then return json response with message key
			})
			.catch((err) => {
				console.error(err);
				return res.status(500).json({ error: err.code });
			});
	});

	// rawBody is a property of every request object
	busboy.end(req.rawBody);
}

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

// Get User's Details
exports.getUserDetails = (req, res) => {
  let userData = {}; // declare empty user object
  db.doc(`/users/${req.user.handle}`) // access user's document by handle
    .get()
    .then((doc) => {
      if (doc.exists) { // assign data to user's credentials if user exist
        userData.credentials = doc.data();
        return db
          .collection('likes')
          .where('userHandle', '==', req.user.handle)
          .get();
      }
    })
    .then((data) => { // list likes user has received
      userData.likes = [];
      data.forEach((doc) => {
        userData.likes.push(doc.data());
			});
			return db
        .collection('notifications')
        .where('recipient', '==', req.user.handle)
        .orderBy('createdAt', 'desc')
        .limit(10)
        .get();
    })
    .then((data) => { // return user’s notifications to be accessed and rendered in front end.
      userData.notifications = [];
      data.forEach((doc) => {
        userData.notifications.push({
          recipient: doc.data().recipient,
          sender: doc.data().sender,
          createdAt: doc.data().createdAt,
          postId: doc.data().postId,
          type: doc.data().type,
          read: doc.data().read,
          notificationId: doc.id
        });
      });
      return res.json(userData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

// Get Any User's details
exports.getAnyUserDetails = (req, res) => {
  let userData = {};
  db.doc(`/users/${req.params.handle}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        userData.user = doc.data();
        return db
          .collection('posts')
          .where('userHandle', '==', req.params.handle)
          .orderBy('createdAt', 'desc')
          .get();
      } else {
        return res.status(404).json({ errror: 'User not found' });
      }
    })
    .then(data => {
      userData.posts = [];
      data.forEach(doc => {
        userData.posts.push({
          body: doc.data().body,
          createdAt: doc.data().createdAt,
          userHandle: doc.data().userHandle,
          userImage: doc.data().userImage,
          likeCount: doc.data().likeCount,
          commentCount: doc.data().commentCount,
          postId: doc.id
        });
      });
      return res.json(userData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

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
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};