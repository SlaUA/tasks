let express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	Mongoose = require('mongoose'),
	dbConfig = require('./config/db'),
	session = require('express-session'),
	MongoStore = require('connect-mongo')(session),
	morgan = require('morgan'),
	apiRoutes = require('./routes/apiRoutes'),
	path = require('path'),
	helmet = require('helmet'),
	expressValidator = require('express-validator'),
	config = require('../config'),
	port = config.port;

app.isDevelopment = (process.env.NODE_ENV || config.environment) === 'dev';

global.app = app;

Mongoose.Promise = global.Promise;

global.dbConnection = Mongoose.connect(dbConfig.cloudUrl, function (err) {
	err ? console.error('db connection problem') : console.log('db connected');
});

app.set('superSecret', dbConfig.secret);
app.set('view engine', 'ejs');

app.use(helmet());

app.isDevelopment && app.use(morgan('dev'));

app.use(
	bodyParser.urlencoded({
		limit: '52428800',
		extended: true
	})
);
app.use(
	bodyParser.json({
		limit: '52428800'
	})
);
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../build')));
app.use(session({
	store: new MongoStore({
		mongooseConnection: global.dbConnection.connection,
		collection: 'sessions'
	}),
	resave: false,
	saveUninitialized: true,
	secret: dbConfig.secret
}));

app.use('/api', apiRoutes);

app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(process.env.PORT || port, function () {
	console.log(`Server has started on port ${port}`);
});