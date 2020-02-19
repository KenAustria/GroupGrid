const { admin, db } = require('../utilities/admin');
const firebaseConfig = require('../utilities/firebaseConfig');
const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);
const { validateSignup, validateLogin } = require('../utilities/validators');

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