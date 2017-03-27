let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

    UserSchema = new Schema({
        username: String,
        password: String,
    });

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);