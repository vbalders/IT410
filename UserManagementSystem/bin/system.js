"use strict";

var fs = require ('fs');
//var mongoose = require('mongoose');
var db = require('../node_modules/mongodb');
var Promise = require('bluebird');

//Making a Connection with MongoDB in Node.js
//mongoose.connect('mongodb://localhost/myappdatabase');


//FUNCTION 1. CREATE A USER
//save users in database

exports.createUser = function (username, password, email) {
    return new Promise (function(resolve, reject){
        db.addNewUser(username, password, email)
            .then(function(user){
                if(!user) return reject ('The user was not added');
                return resolve(user);
            })
            .catch(function(err){
                return reject(err);
            });
    });
    //console.log('The following user has been created: ' + username);
};


//FUNCTION 2. UPDATE A USER'S PASSWORD
//change password
exports.updatePassword = function(username, password, email){
    return new Promise(function(resolve, reject){
        db.updatePassword(username, password)
            .then(function(user){
                if (user.passwordChanged === 0) return reject ('Password didnt changed')
                return resolve(user);
            })
            .catch(function(err){
                return reject(err);
            });
    });
};

//FUNCTION 3. AUTHENTICATE A USER WITH A PASSWORD
//check database for existing user

exports.authenticateUser = function(username, password, email){
    return new Promise(function(resolve, reject){
        db.authenticate(username, password, email)
            .then(function(user){
                return resolve(user);
                //console.log('User was authenticated');

            })
            .catch(function(err){
                return reject(err);
                //console.log('User was not authenticated');
            });
    });
};