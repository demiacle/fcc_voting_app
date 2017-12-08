'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var poll = new Schema({
   owner: String,
   description: String,
   pollOptions: [{
       option: String,
       votes: Number
   }],
   totalVotes: Number
});

module.exports = mongoose.model('poll_info', poll);
