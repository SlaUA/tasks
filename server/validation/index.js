module.exports = {
	username: {
		notEmpty: {
			errorMessage: 'Логин не может быть пустым'
		},
		isLength: {
			options: [{min: 5,max: 10}],
			errorMessage: 'Логин должен содерхать от 5 до 10 символов'
		},
		matches: {
			options: [
				// lowercase, uppercase, number
				/^[a-zA-Z0-9]+$/,
				/[a-z]/
			],
			errorMessage: 'Логин может содержать только латинские буквы (хотя бы одну) и цифры'
		}
	},
	
	password: {
		notEmpty: {
			errorMessage: 'Пароль не может быть пустым'
		},
		isLength: {
			options: [{min: 6,max: 10}],
			errorMessage: 'Пароль должен содерхать от 6 до 10 символов'
		},
		matches: {
			// lowercase, uppercase, number
			options: [
				/^[a-zA-Z0-9]+$/
			],
			errorMessage: 'Пароль может содержать только латинские буквы (хотя бы одну) и цифры'
		}
	}
};