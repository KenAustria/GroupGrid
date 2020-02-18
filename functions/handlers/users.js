const { db } = require('../utilities/admin');
const firebaseConfig = require('../utilities/firebaseConfig');
const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

// Signup a User
exports.signup = (req, res) => {
	// extract form data from request body
	const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
	};

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