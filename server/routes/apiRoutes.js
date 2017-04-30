const API_CONSTANTS = require('../constants/api'),
	ALREADY_REGISTERED_USER_CODE = 11000;

let express = require('express'),
	apiRoutes = express.Router(),
	validationOptions = require('../validation'),
	User = require('../models/user'),
	Todo = require('../models/todo');

function checkLoggedIn(req, res, next) {
	
	if (req.session.user) {
		next();
	} else {
		res.cookie('x-username', '', {expires: new Date()});
		res.json({
			code: API_CONSTANTS.NOT_AUTHORIZED_CODE,
			message: 'Login or register new account'
		});
	}
}

function validateUserInput(req, res, next) {
	
	req.body.username = req.sanitizeBody('username').escape().trim();
	req.body.password = req.sanitizeBody('password').escape().trim();
	
	req.checkBody(validationOptions);
	
	req.getValidationResult().then(function (result) {
		
		// no errors
		if (result.isEmpty()) {
			return next();
		}
		
		// returns 1st error
		res.json({
			code: API_CONSTANTS.ERROR_CODE,
			message: result.useFirstErrorOnly().array()[0].msg
		});
	});
}

apiRoutes

// load all todos
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
				message: 'Todo is created'
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
				message: 'Todo is saved'
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
				message: 'Todo is removed'
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
				message: 'Todos are removed'
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
				message: 'Todos are updated'
			});
		});
	})
	
	// login handler
	.post('/login', validateUserInput, function (req, res) {
		
		User.findOne({username: req.body.username}, function (err, user) {
			
			if (err) {
				throw err;
			}
			
			if (user && user.isPasswordRight(req.body.password)) {
				req.session.user = user;
				res.json({
					code: API_CONSTANTS.OK_CODE,
					message: 'Authorized successfully',
					payload: user.username
				});
			} else {
				res.json({
					code: API_CONSTANTS.ERROR_CODE,
					message: 'Wrong pair login:password'
				});
			}
		});
	})
	
	// register handler
	.post('/register', validateUserInput, function (req, res) {
		
		let newUser = new User({
			username: req.body.username,
			password: req.body.password
		});
		
		// save the sample user
		newUser.save(function (err) {
			
			if (!err) {
				req.session.user = newUser;
				return res.json({
					code: API_CONSTANTS.OK_CODE,
					message: 'Registered successfully',
					payload: newUser.username
				});
			}
			
			if (err.code === ALREADY_REGISTERED_USER_CODE) {
				res.json({
					code: API_CONSTANTS.ERROR_CODE,
					message: 'This login is already in use'
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


