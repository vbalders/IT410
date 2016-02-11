//Load the mongodb module: We used require to load the mongodb module in our code.
// mongodb module represents the native mongodb drivers for Node.js.

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
//Defining the URL we need to connect to: We need to know where our mongodb server is running.
// The url represents the location where the mongodb server instance is running such that we can connect to it.

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/my_database_name';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        //HURRAY!! We are connected. :)
        console.log('Connection established to', url);

        //// Get the documents collection
        //var collection = db.collection('users');
        //
        ////Create some users
        //var user1 = {name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']};
        //var user2 = {name: 'modulus user', age: 22, roles: ['user']};
        //var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};
        //
        //// Insert some users
        //collection.insert([user1, user2, user3], function (err, result) {
        //    if (err) {
        //        console.log(err);
        //    } else {
        //        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
        //    }

            //Close connection
            db.close();
        //});
    }
});
