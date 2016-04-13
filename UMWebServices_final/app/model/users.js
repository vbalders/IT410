const db = require('./config/mongodb');

exports.find_user = function(user){
	return db.find_user(user);
};

exports.create_user = function(user, pass){
	return db.add_user(user,pass);
};

exports.update_user = function(user, pass){
	return db.update_user(user,pass);
};

exports.auth_user = function(user, pass){
	return db.verify_user(user,pass);
};
exports.clear = function(user_name){
	return db.remove(user_name);
};
