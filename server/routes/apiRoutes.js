let express = require('express'),
	apiRoutes = express.Router(),
	User = require('../models/user');

function checkLoggedIn(req, res, next) {

	if (req.session.user) {
		next();
	} else {
		res.redirect('/api/login');
	}
}

apiRoutes
	.get('/login', function (req, res) {

		res.render('pages/loginForm');
	})
	.post('/login', function (req, res) {

		User.findOne({username: req.body.username}, function (err, user) {

			if (err) {
				throw err;
			}

			if (user && user.isPasswordRight(req.body.password)) {
				req.session.user = user;
				res.redirect('/api/myaccount');
			} else {
				res.redirect('/api/login');
			}
		});
	})
	.post('/register', function (req, res) {

		let newUser = new User({
			username: req.body.username,
			password: req.body.password,
			admin: false
		});

		// save the sample user
		newUser.save(function (err) {

			if (err) throw err;
			res.redirect('/api/myaccount');
		});
	})
	.get('/myaccount', checkLoggedIn, function (req, res) {

		res.render('pages/myaccount', {user: req.session.user});
	});

module.exports = apiRoutes;