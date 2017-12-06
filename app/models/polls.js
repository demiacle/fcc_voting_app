'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var poll = new Schema({
   title: String,
   description: String,
   pollOptions: [],
   totalVotes: Number
});

module.exports = mongoose.model('Poll', poll);
