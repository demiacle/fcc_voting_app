'use strict'
var polls = require( '../models/polls.js')
var mongoose = require('mongoose')

function getPolls(req, res, next){
    //console.log(res)
    polls.find({}, 'description owner pollOptions totalVotes', function(err, docs){
        res.locals.polls = docs;
        next();
    });
}

module.exports = getPolls;