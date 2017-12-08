'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var poll = new Schema({
   owner: String,
   title: String,
   description: String,
   pollOptions: [],
   totalVotes: Number
});

module.exports = mongoose.model('poll_info', poll);
