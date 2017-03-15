let express = require('express'),
	app = express(),
	port = 3000,
	bodyParser = require('body-parser'),
	session = require('express-session'),
	passport = require('passport'),
	mongoose = require('mongoose'),
	dbConfig = require('./config/db'),
	morgan = require('morgan');

// require('./config/passport')(passport);

// mongoose.connect(dbConfig.url);

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	resave: false,
	saveUninitialized: true,
	secret: 'LoveMyWifeVictoria'
}));
app.use(passport.initialize());
app.use(passport.session());

require('./config/routes.js')(app, passport);

app.listen(port, function () {
	console.log(`Server has started on port ${port}`);
});