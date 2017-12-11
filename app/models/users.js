'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
	ip: String,
	github: {
		id: String,
		displayName: String,
		username: String
	},
	twitter: {
	    id: String,
		displayName: String,
		username: String
	},
    votesCast: [],
    postsCreated: []
});

user.statics.findOneOrCreate = function ( condition, callback ){
    var self = this;
    self.findOne( condition, function(err, result){
        if( result ){
            return callback( err, result );
        } else {
            self.create(condition, function(err, result){
                return callback(err, result);
            })
        }
    })
}

module.exports = mongoose.model('User', user);
