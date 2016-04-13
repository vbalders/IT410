// set up ======================================================================
// get all the tools we need
const express = require('express')
const body_parser = require('body-parser')
const passport = require('passport')
const passport_local = require('passport-local').Strategy
const cookie_parser = require('cookie-parser')
const users = require('./app/model/users')
const session = require('express-session');
var app = express();
var port     = process.env.PORT || 8181;
passport.use(new passport_local(function(user_name, password, done) {
    users.auth_user(user_name, password).then(function(val){
    		return done(null, val);
    	}).catch(function(err){
    		return done(null, false);
    	});
}));
passport.deserializeUser(function(user_name, done) {
	users.find_user(user_name).then(function(user){
			done(null, user);
		});
});
passport.serializeUser(function(user, done) {
    done(null, user.user_name);
});
// Setup Application
app.use(body_parser.urlencoded({
  extended: true
}));
app.use(cookie_parser());
app.use(session({
  secret: 'e8051d1a6254532bf62da77cdf8a3f9b',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./app/routes'));

app.listen(port);
console.log('Lisenting: ' + port);
