'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
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

module.exports = mongoose.model('User', user);
