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
			message: 'Авторизуйтесь или зарегистрируйтесь'
		});
	}
}

function validateUserInput(req, res, next) {
	
	req.body.username = req.sanitizeBody('username').escape().trim();
	req.body.password = req.sanitizeBody('password').escape().trim();
	
	req.checkBody({
		username: {
			notEmpty: true,
			isLength: {
				options: [{ min: 5, max: 10 }],
				errorMessage: 'Логин должен содерхать от 5 до 10 символов'
			},
			errorMessage: 'Неверный логин и/или пароль'
		},
		password: {
			notEmpty: true,
			isLength: {
				options: [{ min: 6, max: 10 }],
				errorMessage: 'Пароль должен содерхать от 6 до 10 символов'
			},
			matches: {
				options: [/example/i],
				errorMessage: 'example!'
			},
			errorMessage: 'Неверный логин и/или пароль'
		}
	});
	
	req.getValidationResult().then(function (result) {
		
		console.log(result.mapped());
		
		if (result.isEmpty()) {
			return next();
		}
		
		res.json({
			code: API_CONSTANTS.ERROR_CODE,
			message: API_CONSTANTS.ERROR_MESSAGE,
			payload: result
		});
	});
	
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
				message: 'Todo успешно сохранено'
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
				message: 'Todo успешно сохранено'
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
				message: 'Todo успешно удалено'
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
				message: 'Todo успешно удалены'
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
				message: 'Todo успешно обновлены'
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
					message: 'Успешно авторизирован',
					payload: user.username
				});
			} else {
				res.json({
					code: API_CONSTANTS.ERROR_CODE,
					message: 'Неверный логин и/или пароль'
				});
			}
		});
	})
	
	// register handler
	.post('/register', validateUserInput, function (req, res) {
		
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
					message: 'Успешно зарегистрирован',
					payload: newUser.username
				});
			}
			
			if (err.code === ALREADY_REGISTERED_USER) {
				res.json({
					code: API_CONSTANTS.ERROR_CODE,
					message: 'Пользователь с таким ником уже существует'
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


