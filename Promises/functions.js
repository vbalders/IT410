// ASSIGNMENT
var fs = require ('fs');
//var Promise = require('bluebird');
var Path = require ('path');

//FUNCTION 1. THAT RETURNS A PROMISE
exports.getPathType = getPathType;
function getPathType(path) {
    return new Promise(function (resolve, reject) {
        if (typeof path !== 'string') {
            reject('path is not a string!');
        }
        fs.stat(path, function (err, value) {
            if (err) {
                return resolve("nothing");
            }
            else if (value.isFile()) { //function needs ()
                return resolve("file"); //resolve: promise is done
            }
            else if (value.isDirectory()) {
                resolve("directory");
            }
            else {
                resolve("other");
            }
        });
    });
};

//FUNCTION 2A readdir

exports.readdir= function (path){
    return exports.getPathType(path)
        .then(function (type) {
        //console.log(path);//*********************************************************
        //console.log(type);//**********************************************************
        if (type !== 'directory') throw Error('Not a directory');
        return new Promise(function (resolve, reject) {
            fs.readdir(path, function (err, files) {
                if (err) return reject(err);
                return resolve(files);
            });
        });
    });
};

//FUNCTION 2 getDirectoryTypes

//exports.getDirectoryTypes = getDirectoryTypes;
exports.getDirectoryTypes = function(path, depth, filter) {
    var result = {};//map
    //if(typeof depth !== 'number'){
    //return Promise.reject('depth is not a number');
    // }
    if (arguments.length < 2) depth = -1;
    if (arguments.length < 3) filter = function() {
        return true };
    if (typeof depth !== "number") return Promise.reject("depth is not a number");
    if (typeof filter !== "function") return Promise.reject("filter is not a function");
    if (typeof path !== "string") return Promise.reject("path is not a string");
    return exports.readdir(path)
        .then(function(files) {
            var promises = [];
            files.forEach(function(file) {
                var fullPath = Path.resolve(path, file);
                var promise = exports.getPathType(fullPath)
                    .then(function(type) {
                        if (filter(fullPath, type)) result[fullPath] = type;
                        if (type === 'directory' && depth !== 0) {
                            //Creates a map
                            return exports.getDirectoryTypes(fullPath, depth - 1, filter)
                                .then(function(map) {
                                    Object.assign(result, map);
                                });
                        }
                    });
                promises.push(promise);
            });
            return Promise.all(promises)
                .then(function() {
                    return result;
                });
        });
}

////FUNCTION 3 exists
exports.exists = exists;
function exists(path){
    return new Promise (function(resolve, reject) {
        //REJECTS
        if (typeof path !== 'string') {
            reject('path is not a string!');
        }
        var promises=[];
        promises.push(getPathType(path));
        Promise.all(promises).then(function(value){
            console.log(value);
            //RESOLVES
            if (value =='file' || value == 'directory'){
                resolve(true);
            }
            else{
                resolve(false);
            }
        });
    });
}

//FUNCTION 4 getFilePaths

//exports.getFilePaths = getFilePaths;
exports.getFilePaths = function(path, depth){
    //console.log(path);
    //Using getDirectoryTypes to check for string, depth, filter
    return exports.getDirectoryTypes(path, depth, function (path, type) {
        return type === 'file';
            //console.log(type);
    })
        .then(function(resolution) {
            return Object.keys(resolution);
        })
};

//exports.getFilePaths = getFilePaths;
//function getFilePaths(path) {
//console.log(typeof depth);
//return new Promise(function (resolve, reject) {
//if (typeof path !== 'string') {
//return reject('path is not a string!');
//}
//if(typeof depth !== 'number')throw Error;{
//return reject('depth is not a number');
//}
//if (err) {
//return reject("other error");
//}
//else {
//var p = Promise.resolve([path]);
//p.then(function(v) {
//console.log(v[0]);
//});
//return resolve ();
//}
//});
//}

//FUNCTION 5 readFile
exports.readFile = readFile;
function readFile(path) {
    return new Promise(function (resolve, reject) {
        if (typeof path !== 'string') {
            return reject('path is not a string');
        }
        var promises = [];
        promises.push(getPathType(path));
        Promise.all(promises).then(function (value) {
            //console.log(value);
            if (value == 'directory' || value == 'other') {
                return reject('path does not point to a file');
            }
            else if (value == 'nothing') {
                return reject('Error: the file cannot be open');
            }
            else {
                fs.readFile(path, 'utf8', function (err, data) {
                    if (err){
                        console.error(err.stack);
                    }
                    else {
                        return resolve (data);
                        //return resolve(data.substr(0,2));
                        //console.log(data.substr(0, 2));
                    }
                });
            }
        });
    });
};

//FUNCTION 6 readFiles
//exports.readFiles = readFiles;
exports.readFiles = function(path){
    return new Promise( function( resolve, reject){
        var paths = [];
        //console.log (paths)
        var promises = [];
        //console.log (promises)
        //if (typeof paths !== 'string'){
        //return reject ('path is not a string');
        //}
        for(var i = 0; i < path.length; i++){
            //console.log (path)
            //use readFile
            exports.readFile(path[i])
                .catch( function(err){
                reject(err);
            });
            promises.push(exports.readFile(path[i]));
            paths.push(path[i]);
            //console.log (path, 'THIS IS A PATH')
        }
        Promise.all(promises).then( function(value){
            var results = {};
            for(var i = 0; i < paths.length; i++){
                results[paths[i]] = value[i];
            }
            //console.log (results)
            resolve(results);
        })
    })
};

    //fs.readFile(paths, 'utf8', function (err, data) {
        //if (err){
        //console.error(err.stack);
        //}
        //else {
            //return resolve(data);
        //}
    //}




//******CALL FUNCTIONS***********

//FUNCTION 1: FILE, DIRECTORY, OTHER, NONE
//INCOMPLETE TEST************
//getPathType('test.txt').then(function(value){
//    console.log(value);
//})

//FUNCTION 2
//getDirectoryTypes('/Users/macbook/PhpstormProjects/Promises/test/',5);

//FUNCTION 3: TRUE/FALSE IF FILE EXIST
//exists('test.txt').then(function(value){
//    console.log(value);
//}).catch(function(err){
//    console.log(err);
//})

////FUNCTION 5: GET THE CONTENT OF A FILE
//readFile('/Users/macbook/PhpstormProjects/Promises/test/test.txt').then(function(value){
//    console.log(value);
//}).catch(function(err){
//    console.log(err);
//    //console.log(data.substr(0, 1));
//})

//FUNCTION 4:
//getFilePaths('test.txt');


//FUNCTION 6: GET THE CONTENT OF MULTIPLE FILES
//readFiles('test.txt', 'test2.txt').then(function(value){
//    //console.log(value);//PRINT CONTENT OF A FILE
//}).catch(function(err){
//    //console.log(data.substr(0, 1));
//})


