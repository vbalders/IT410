"use strict";
var expect = require('chai').expect;
var system =require('../system');
var Promise = require('bluebird');

describe ('system', function(){


    it ('create a user', function(){
        return system.createUser('viri', 'vbalders', 'vbalderas8@gmail.com')
            .then(function(user){
                expect(user.result.number).to.be.equal(1);
            });
    });

    it ('updates password', function(){
        return system.createUser('viri', 'vbalders', 'vbalderas8@gmail.com')
            .then(function(user){
                return system.updatePassword('viri', 'itclass', 'vbalderas8@gmail.com')
                    .then(function(user){
                        expect(user.result.passwordChanged).to.be.equal(1);
                    });
            });
    });

    it ('authenticate user', function(){
        return system.createUser('viri', 'vbalders', 'vbalderas8@gmail.com')
            .then(function(user){
                return system.authenticateUser('viri', 'vbalders', 'vbalderas8@gmail.com')
                    .then(function(authentication){
                        expect(authentication.username).to.be.equal('viri');
                        expect(authentication.password).to.be.equal('vbalders');
                        expect(authentication.email).to.be.equal('vbalderas8@gmail.com');
                    });
            });
    });

});

