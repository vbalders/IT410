const express = require('express');
const router = express.Router();
const users = require('./model/users');
const passport = require('passport');


router.get('/api/user', function(req, res){
	if(req.user) res.send(req.user.user_name);
	else res.send('User not loggedin');
});

router.post('/api/user', function(req, res){
	var user_name = req.body.user_name;
	var password = req.body.password;
	users.create_user(user_name, password).then(function(val){
			res.send('User has been created')
		}).catch(function(err){
			res.send('Error: ' + err);
		});
});

router.put('/api/user', function(req, res){
	var user_name = req.body.user_name;
	var password = req.body.password;
	users.create_user(user_name, password).then(function(val){
			res.send('User has been created');
		}).catch(function(err){
			if(req.user && req.user.user_name === user_name){
				users.update_user(user_name, password).then(function(val){
						res.send('User has been updated');
					}).catch(function(err){
						res.send(err);
					});
			}
			else res.send('User not loggedin');
		});
});

router.put('/api/login', passport.authenticate('local'), function(req, res, next){
	res.send('Success, ' + req.user.user_name);
});

router.put('/api/logout', function(req, res){
	req.logout();
	res.send('BYE');
});

module.exports = router;
