let express = require('express'),
	apiRoutes = express.Router(),
	User = require('../models/user'),
	Todo = require('../models/todo');

function checkLoggedIn(req, res, next) {
	
	if (req.session.user) {
		next();
	} else {
		res.cookie('x-username', '', {expires: new Date()});
		res.json({
			status: 'Forbidden',
			code: 403,
			message: 'Please log in or create new account'
		});
	}
}

apiRoutes
	.get('/todos', checkLoggedIn, function (req, res) {
		
		Todo.find({creator: req.session.user._id}, function (err, todos) {
			if (err) {
				throw err;
			}
			res.json({
				code: 200,
				message: 'Success',
				todos: todos
			});
		});
	})
	
	// post todo
	.post('/todo', checkLoggedIn, function (req, res) {
		
		let newTodo = new Todo({
			id: req.body.id,
			text: req.body.text,
			isDone: req.body.isDone,
			creator: req.session.user._id
		});
		
		newTodo.save(function (err) {
			if (err) {
				res.json({
					status: 'Failed',
					code: 500,
					message: 'Internal Server Error'
				});
				throw err;
			}
			res.json({
				status: 'Success',
				code: 200,
				message: 'Todo has been saved'
			});
		});
	})
	
	// change particular todo
	.post('/todo/:id', checkLoggedIn, function (req, res) {
		
		Todo.update({
			id: req.params.id,
			creator: req.session.user._id
		}, {$set: req.body}, (err) => {
			
			if (err) {
				res.json({
					status: 'Failed',
					code: 500,
					message: 'Internal Server Error'
				});
				throw err;
			}
			res.json({
				status: 'Success',
				code: 200,
				message: 'Todo has been saved'
			});
		});
	})
	.post('/login', function (req, res) {
		
		User.findOne({username: req.body.username}, function (err, user) {
			
			if (err) {
				throw err;
			}
			
			if (user && user.isPasswordRight(req.body.password)) {
				req.session.user = user;
				res.json({
					status: 'Ok',
					code: 200,
					message: 'Successfully authenticated',
					payload: user.username
				});
			} else {
				res.json({
					status: 'Failed to authenticate',
					code: 403,
					message: 'Wrong username and/or password.'
				});
			}
		});
	})
	.post('/register', function (req, res) {
		
		let newUser = new User({
			username: req.body.username,
			password: req.body.password,
			admin: false
		});
		const ALREADY_REGISTERED_USER = 11000;
		
		// save the sample user
		newUser.save(function (err) {
			
			if (!err) {
				req.session.user = newUser;
				return res.json({
					status: 'Ok',
					code: 200,
					message: 'Successfully registered',
					payload: newUser.username
				});
			}
			
			if (err.code === ALREADY_REGISTERED_USER) {
				res.json({
					status: 'Failed',
					code: 500,
					message: 'Username already taken'
				});
			} else {
				res.json({
					status: 'Failed',
					code: 500,
					message: 'Internal Server Error'
				});
				throw err;
			}
		});
	});

module.exports = apiRoutes;