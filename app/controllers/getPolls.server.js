'use strict'
var polls = require( '../models/polls.js')
var users = require( '../models/users.js')
var mongoose = require('mongoose')

function getPolls(req, res, next){
    polls.find({}, 'description owner pollOptions totalVotes', function(err, pollSchema){
        if( res.locals.isLoggedIn ){
            //console.log(req.user)
            var parsedPolls = pollSchema.map( function(i){
                if( i.owner == req.user._id ){
                    i.isCreator = true;
                }
                if( req.user.votesCast.includes( i._id.toString() ) == true ){
                    i.hasVoted = true;
                }
                return i;
            })
            res.locals.polls = parsedPolls;
            next();
        } else {
            var anonUser = users.findOneOrCreate({ ip : req.ip }, function(err, user) {
                if(err)
                    console.log(err)
                var parsedPolls = pollSchema.map(function (i) {
                    if (i.owner == user._id) {
                        i.isCreator = true;
                    }
                    if (user.votesCast.includes(i._id.toString()) == true) {
                        i.hasVoted = true;
                    }
                    return i;
                })
                res.locals.polls = parsedPolls;
                next();
            })
        }
    });
}

module.exports = getPolls;