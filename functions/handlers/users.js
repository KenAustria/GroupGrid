const { db } = require('../utilities/admin');
const firebaseConfig = require('../utilities/firebaseConfig');
const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

// Signup
exports.signup = (req, res) => {
	// extract form data from request body
	const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
	};

	// validate data
	let token, userId;
	db.doc(`/users/${newUser.handle}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res.status(400).json({ handle: 'Handle already exist.' });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
		.then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
		.then(idToken => {
			token = idToken;
			const userCredentials = {
				handle: newUser.handle,
				email: newUser.email,
				createdAt: new Date().toISOString(),
				userId
			};
			return db.doc(`/users/${newUser.handle}`).set(userCredentials);
		})
		.then(() => {
			return res.status(201).json({ token });
		})
		.catch(err => {
			console.error(err);
			if (err.code === `auth/email-already-in-use`) {
				return res.status(400).json({ email: 'Email already exist.' });
			} else {
				return res.status(500).json({ error: err.code });
			}
		})
};