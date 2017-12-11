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
        if( res.locals.isLoggedIn && poll.owner == req.user._id ){
            res.locals.currentPoll.isCreator = true;
        }
        next();
    })
}

module.exports = getPollData;