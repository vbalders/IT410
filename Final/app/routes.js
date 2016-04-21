// app/routes.js
var Hour = require('../app/models/hour');
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/table-hours', isLoggedIn, function(req, res) {


		res.render('time_table.ejs', {
			user : req.user, // get the user out of session and pass to template
		});


	});
	app.get('/clock-in', isLoggedIn, function(req, res) {
		//var hour=new Hour();
		Hour.find({}, function(err, hours) {
			if (err) throw err;

			// object of all the users
			console.log(hours);
		});

		res.render('profile.ejs', {
			user : req.user, // get the user out of session and pass to template
		});

		 res.json(hours);

	});
	app.post('/hours', function(req, res) {
		//var hour=new Hour();
		var $user=req.body.email;
		Hour.find({email: $user}, function(err, hours) {
			if (err) throw err;

			// object of all the users
			res.json(hours);
		});
	});
	app.post('/status', function(req, res) {
		//var hour=new Hour();
		var $user=req.body.email;
		Hour.find({email: $user}).sort('-new_date').limit(1).exec(function(err, hours) {
			if (err) throw err;

			// object of all the users
			res.json(hours);
		});
	});
	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/clock-in', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/clock-in', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	app.post('/save-time', function(req,res){
			var hour=new Hour();
			var response = {};
			var time=req.body.time;
			var type=req.body.type;
			hour.email = req.body.email;
			hour.new_date = req.body.time;
			hour.type = req.body.type;
			//console.log('test');
			hour.save(function(err){
				if(err) {
					 response = {"error" : 1,"message" : "Error adding data"};
			 } else {
					 response = {"error" : 0,"message" : "Data added", time, type};
			 }
			 res.json(response);
			});







	});
	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	/*app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});*/

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};


// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/login');
}
