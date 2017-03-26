let mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Todo;

Todo = mongoose.model(new Schema({
	id: Number,
	text: String,
	isDone: Boolean,
	creator: {
		type: Number,
		ref: 'User'
	}
}));

module.exports = Todo;