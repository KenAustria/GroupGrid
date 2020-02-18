const { admin, db } = require('../utilities/admin');

module.exports = (req, res, next) => {
	let idToken;

	// if user is authenticated by the server, and Bearer convention exist
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
		idToken = req.headers.authorization.split('Bearer ')[1];
	} else {
		console.error('No token found')
		return res.status(403).json({ error: 'Unauthorized' });
	}

	// confirm this token is issued by our application
	// conditional, user making the request must match user ids
	admin
		.auth()
		.verifyIdToken(idToken)
		.then(decodedToken => {
			req.user = decodedToken;
			console.log(decodedToken);
			return db.collection('users')
				.where('userId', '==', req.user.uid)
				.limit(1)
				.get();
		})
		.then(data => { // assign handle and image from data
			req.user.handle = data.docs[0].data().handle;
			req.user.profileImage = data.docs[0].data().profileImage;
			return next();
		})
		.catch(err => {
			console.error('Error verifying token', err);
			return res.status(403).json(err);
	})
}