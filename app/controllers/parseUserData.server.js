'use strict';

var Users = require('../models/users.js');
var MongoClient = require('mongodb').MongoClient;

function parseUserData ( userID ) {

    MongoClient.connect( process.env.MONGO_URI, function(err, db){
        
    })



}

module.exports = parseUserData;
