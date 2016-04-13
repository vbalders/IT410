const MongoClient = require('mongodb').MongoClient;
const Promise = require('bluebird');
const assert = require('assert');

var mongodb;
var url = 'mongodb://localhost:27017/userManagement';

var connect = function(){
	return new Promise(function(resolve, reject){
		if(mongodb) return resolve(mongodb);
		MongoClient.connect(url, function (err, db) {
			return resolve(db);
		});
	});
};

exports.addUser = function(user, pass){
	return connect()
	.then(function(db){
		return exports.findUser(user)
			.then(function(val){
				if(!val) return db.collection('users').insertOne({user_name: user, password: pass});
				return new Promise(function(resolve, reject){
					return resolve();
				});
			});
	});
};

exports.updateUser = function(user, pass){
	return connect()
	.then(function(db){
		return db.collection('users').update({user_name: user}, {user_name: user, password: pass}, {upsert: false});
	});
};

exports.findUser = function(user){
	return connect()
	.then(function(db){
		return db.collection('users').findOne({user_name: user});
	});
};

exports.verifyUser = function(user, pass){
	return connect()
	.then(function(db){
		return db.collection('users').findOne({user_name: user, password: pass});
	});
};

exports.remove = function(user){
	return connect()
	.then(function(db){
		return db.collection('users').remove({user_name: user});
	});
}
