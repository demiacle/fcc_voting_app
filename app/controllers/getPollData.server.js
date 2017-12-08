'use strict'
var mongoose = require('mongoose')
var path = process.cwd();
var pollSchema = require(path + '/app/models/polls.js')

function getPollData(req, res, next){
    var query = { _id: req.params.id }
    var projection = 'totalVotes description owner pollOptions'
    pollSchema.findOne( query, projection, function(err, poll){
        if(err)
            throw err;
        res.locals.currentPoll = poll;
        // compare poll data to user and add to variable 
        next();
    })
}

module.exports = getPollData;