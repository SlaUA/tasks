let express = require('express'),
	API_CONSTANTS = require('../constants/api'),
	apiRoutes = express.Router(),
	User = require('../models/user'),
	Todo = require('../models/todo');

function checkLoggedIn(req, res, next) {
	
	if (req.session.user) {
		next();
	} else {
		res.cookie('x-username', '', {expires: new Date()});
		res.json({
			code: API_CONSTANTS.NOT_AUTHORIZED_CODE,
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
				code: API_CONSTANTS.OK_CODE,
				message: API_CONSTANTS.OK_MESSAGE,
				payload: todos
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
					code: API_CONSTANTS.ERROR_CODE,
					message: API_CONSTANTS.ERROR_MESSAGE
				});
				throw err;
			}
			res.json({
				code: API_CONSTANTS.OK_CODE,
				message: 'Todo has been saved'
			});
		});
	})
	
	// change particular todo
	.put('/todo/:id', checkLoggedIn, function (req, res) {
		
		Todo.update({
			id: req.params.id,
			creator: req.session.user._id
		}, {$set: req.body}, (err) => {
			
			if (err) {
				res.json({
					code: API_CONSTANTS.ERROR_CODE,
					message: API_CONSTANTS.ERROR_MESSAGE
				});
				throw err;
			}
			res.json({
				code: API_CONSTANTS.OK_CODE,
				message: 'Todo has been saved'
			});
		});
	})
	
	// delete particular todo
	.delete('/todo/:id', checkLoggedIn, function (req, res) {
		
		Todo.findOneAndRemove({
			id: req.params.id,
			creator: req.session.user._id
		}, {$set: req.body}, (err) => {
			
			if (err) {
				res.json({
					code: API_CONSTANTS.ERROR_CODE,
					message: API_CONSTANTS.ERROR_MESSAGE
				});
				throw err;
			}
			res.json({
				code: API_CONSTANTS.OK_CODE,
				message: 'Todo has been removed'
			});
		});
	})
	
	// delete all todos
	.delete('/todos', checkLoggedIn, function (req, res) {
		
		Todo.remove({}, (err) => {
			
			if (err) {
				res.json({
					code: API_CONSTANTS.ERROR_CODE,
					message: API_CONSTANTS.ERROR_MESSAGE
				});
				throw err;
			}
			res.json({
				code: API_CONSTANTS.OK_CODE,
				message: 'Todos has been removed'
			});
		});
	})
	
	// done all todos
	.put('/todos', checkLoggedIn, function (req, res) {
		
		Todo.update({}, {
			$set: {
				isDone: true
			}
		}, {multi: true}, (err) => {
			
			if (err) {
				res.json({
					code: API_CONSTANTS.ERROR_CODE,
					message: API_CONSTANTS.ERROR_MESSAGE
				});
				throw err;
			}
			res.json({
				code: API_CONSTANTS.OK_CODE,
				message: 'Todos have been updated'
			});
		});
	})
	
	// login handler
	.post('/login', function (req, res) {
		
		User.findOne({username: req.body.username}, function (err, user) {
			
			if (err) {
				throw err;
			}
			
			if (user && user.isPasswordRight(req.body.password)) {
				req.session.user = user;
				res.json({
					code: API_CONSTANTS.OK_CODE,
					message: 'Successfully authenticated',
					payload: user.username
				});
			} else {
				res.json({
					code: API_CONSTANTS.ERROR_CODE,
					message: 'Wrong username and/or password.'
				});
			}
		});
	})
	
	// register handler
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
					code: API_CONSTANTS.OK_CODE,
					message: 'Successfully registered',
					payload: newUser.username
				});
			}
			
			if (err.code === ALREADY_REGISTERED_USER) {
				res.json({
					code: API_CONSTANTS.ERROR_CODE,
					message: 'Username already taken'
				});
			} else {
				res.json({
					code: API_CONSTANTS.ERROR_CODE,
					message: API_CONSTANTS.ERROR_MESSAGE
				});
				throw err;
			}
		});
	});

module.exports = apiRoutes;


