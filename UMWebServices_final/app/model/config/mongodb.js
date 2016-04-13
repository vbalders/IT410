const mongo_client = require('mongodb').mongo_client;
const Promise = require('bluebird');
var mongodb;
var url = 'mongodb://localhost:27017/users';

var connect = function(){
	return new Promise(function(resolve, reject){
		if(mongodb) return resolve(mongodb);
		mongo_client.connect(url, function (err, db) {
			return resolve(db);
		});
	});
};
exports.find_user = function(user_name){
	return connect().then(function(db){
		return db.collection('users').findOne({user_name: user_name});
	});
};

exports.add_user = function(user_name, password){
	return connect().then(function(db){
		return exports.find_user(user_name).then(function(val){
				if(!val) return db.collection('users').insertOne({user_name: user_name, password: password});
				return new Promise(function(resolve, reject){
					return resolve();
				});
			});
	});
};

exports.update_user = function(user_name, password){
	return connect().then(function(db){
		return db.collection('users').update({user_name: user_name}, {user_name: user_name, password: password}, {upsert: false});
	});
};

exports.verify_user = function(user_name, password){
	return connect().then(function(db){
		return db.collection('users').findOne({user_name: user_name, password: password});
	});
};

exports.remove = function(user_name){
	return connect().then(function(db){
		return db.collection('users').remove({user_name: user_name});
	});
};
