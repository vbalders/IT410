"use strict";

var fs = require ('fs');
var cmarguments = require ('command-line-args');
var express = require ('express');
var app = express();

//Input
var myinput = cmarguments([
    { name:'directory', other: 'i', type: String },
    { name: 'port', alias: 'pt', type: Number}

]);

var actions =  myinput.parse();
var port = actions.port || 8080;
var mydir = actions.directory || process.cwd();
app.use(express.static(mydir));
app.get('/', function(req, res) {
    res.send('Files are served from directory: ' + myinput);
});
app.listen(port, function() {
    console.log('Server in port: ' + port);
});
