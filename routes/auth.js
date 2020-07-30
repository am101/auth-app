const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// importing User model
const User = require('../models/User');

// importing validation
const { registerValidation, loginValidation } = require('./config/validation');

// creating /api/user/register
router.post('/register', async (req, res) => {
	// getting users data
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;

	// getting validation
	const { error } = registerValidation(req.body);

	// validating data
	if (error) return res.send(error.details[0].message);

	// checking if email exists
	const emailExists = await User.findOne({ email: email });
	if (emailExists) return res.status(400).send('email already exists');

	// hashing password
	const hashedPassword = await bcrypt.hash(password, 12);

	// creating new User
	const newUser = new User({
		name: name,
		email: email,
		password: hashedPassword
	});

	// saving new User
	try {
		const saveUser = await newUser.save();
		res.send(saveUser);
	} catch (err) {
		res.status(400).send(err);
	}
});

// creating /api/user/login
router.post('/login', async (req, res) => {
	// getting user data
	const email = req.body.email;
	const password = req.body.password;

	// getting validation
	const { error } = loginValidation(req.body);

	// validating data
	if (error) return res.send(error.details[0].message);

	// checking if email exists
	const user = await User.findOne({ email: email });
	if (!user) return res.status(400).send('email not found');

	// checking password
	const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) return res.status(400).send('password is incorrect');
    
    // assigning a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token);


	res.send(token);
});

module.exports = router;
