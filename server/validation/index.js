module.exports = {
	username: {
		notEmpty: {
			errorMessage: 'Login can not be empty'
		},
		isLength: {
			options: [{min: 5,max: 10}],
			errorMessage: 'Login should contains from 5 to 10 symbols'
		},
		matches: {
			options: [
				// lowercase, uppercase, number
				/^[a-zA-Z0-9]+$/,
				/[a-z]/
			],
			errorMessage: 'Login should contains latin letters (at least 1) and numbers'
		}
	},
	
	password: {
		notEmpty: {
			errorMessage: 'Password can not be empty'
		},
		isLength: {
			options: [{min: 6,max: 10}],
			errorMessage: 'Password should contains from 6 to 10 symbols'
		},
		matches: {
			// lowercase, uppercase, number
			options: [
				/^[a-zA-Z0-9]+$/
			],
			errorMessage: 'Password should contains latin letters (at least 1) and numbers'
		}
	}
};