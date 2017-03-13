module.exports = function (app, passport) {

	app.get('/', function (req, res) {
		res.send('Hello World!');
	});

	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	app.get('/signup', function(req, res) {

		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});
};