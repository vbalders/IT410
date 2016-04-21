// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var bodyParser = require('body-parser');
var configDB = require('./config/database.js');
var bodyParser = require('body-parser');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration


app.configure(function() {

	// set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms
  app.use(express.static(__dirname + '/public'));
	app.set('view engine', 'ejs'); // set up ejs for templating
	app.use(bodyParser.urlencoded({
	  extended: true
	}));
	// required for passport
	app.use(express.session({ secret: 'e8051d1a6254532bf62da77cdf8a3f9b' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

});

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('Lisenting ' + port);
