let mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Todo;

Todo = mongoose.model('Todo', new Schema({
	id: Number,
	text: String,
	isDone: Boolean,
	creator: {
		type: String,
		ref: 'User'
	}
}));

module.exports = Todo;