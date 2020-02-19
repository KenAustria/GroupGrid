// Valid Input Handler
const isEmpty = (string) => {
  if (string.trim() === '') return true;
  else return false;
};

// Valid Email Handler
const isEmail = (email) => {
  const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

// Signup Validation
exports.validateSignup = (data) => {
	// declare host error object
	let errors = {};

	// conditional, valid input
	if (isEmpty(data.email)) {
    errors.email = 'Email cannot be empty.';
  } else if (!isEmail(data.email)) { // conditional, input must be valid email
    errors.email = 'Valid email address needed.';
  }

	// conditional, valid password input
  if (isEmpty(data.password)) errors.password = 'Password cannot be empty.';

	// conditional, confirm password input must match password input
	if (data.password !== data.confirmPassword)
		errors.confirmPassword = 'Passwords must match.';

	// conditional, valid handle input
  if (isEmpty(data.handle)) errors.handle = 'User Handle cannot be empty.';

	// if no errors, valid returns true meaning data is valid
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

// Login Validation
exports.validateLogin = (data) => {
	// declare host error object
	let errors = {};

	// conditional, valid input for email and password
  if (isEmpty(data.email)) errors.email = 'Email cannot be empty.';
  if (isEmpty(data.password)) errors.password = 'Password cannot be empty.';

	// if no errors, valid returns true meaning data is valid
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

// User Details Validation
exports.reduceUserDetails = (data) => {
  let userDetails = {};

	// user bio field validation
	if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio;

	// currently not working, user website field will not be allowed to be empty and no 'https'
  // if (!isEmpty(data.website.trim())) {
  //   if (data.website.trim().substring(0, 4) !== 'http') {
  //     userDetails.website = `http://${data.website.trim()}`;
  //   } else userDetails.website = data.website;
	// }

	// user location field validation
  if (!isEmpty(data.location.trim())) userDetails.location = data.location;

  return userDetails;
};