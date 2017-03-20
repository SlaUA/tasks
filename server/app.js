let express = require('express'),
	app = express(),
	port = 3000,
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	Mongoose = require('mongoose'),
	dbConfig = require('./config/db'),
	session = require('express-session'),
	MongoStore = require('connect-mongo')(session),
	morgan = require('morgan'),
	apiRoutes = require('./routes/apiRoutes'),
	path = require('path'),
	helmet = require('helmet');

global.app = app;

global.dbConnection = Mongoose.connect(dbConfig.url, function (err) {
	err ? console.error('db connection problem') : console.log('db connected');
});

app.set('superSecret', dbConfig.secret);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
	limit: '52428800',
	extended: true
}));
app.use(bodyParser.json({
	limit: '52428800'
}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, '/static/')));

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

app.get('/', function (req, res) {
	res.render('pages/index');
});

app.listen(port, function () {
	console.log(`Server has started on port ${port}`);
});