let mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto'),
	userSchema = new Schema({
		username: {
			type: String,
			unique: true
		},
		passwordHash: String,
		salt: String,
		todos: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Todo'
			}
		]
	}),
	User;

userSchema.methods.isPasswordRight = function (password) {
	
	return User.sha512(password, this.salt) === this.passwordHash;
};

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} [length] - Length of the random string.
 */
userSchema.statics.makeSalt = function (length) {
	
	return crypto.randomBytes(Math.ceil((length || 16) / 2))
	             .toString('hex') /** convert to hexadecimal format */
	             .slice(0, length);
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password
 * @param {string} salt - Data to be validated.
 */
userSchema.statics.sha512 = function (password, salt) {
	
	let hash = crypto.createHmac('sha512', salt);
	hash.update(password);
	
	return hash.digest('hex');
};

//save: function (okFn, failedFn) {
// if (this.isValid()) {
// 	this.__super__(okFn);
// } else {
// 	failedFn();
// }
// }

userSchema.virtual('password')
          .set(function (password) {
	
	          this.salt = User.makeSalt();
	          this.passwordHash = User.sha512(password, this.salt);
          });

User = mongoose.model('User', userSchema);

module.exports = User;