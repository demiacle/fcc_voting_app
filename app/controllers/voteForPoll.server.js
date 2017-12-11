'use strict'

var users = require('../models/users.js');
var polls = require( '../models/polls.js')
var mongoose = require('mongoose')


function voteForPoll( req, res, next ){
    if( res.locals.isLoggedIn ){
        if( req.user.votesCast.includes( req.params.pollId ) === false ){
            updateUser( req.user, req.params.pollId ); // TODO make into promise chain
            updatePoll( req, res, next, req.user );
        } else {
            var error = "You have already voted on this poll."
            var backURL = req.header('Referer').split('?')[0] || '/';
            res.redirect( backURL + '?error=' + encodeURIComponent( error ) )
        }
    } else {
        users.findOneOrCreate( { ip : req.ip }, function(err, user){
            if( user.votesCast.includes( req.params.pollId ) === false ){
                updateUser(user, req.params.pollId );            
                updatePoll(req, res, next, user);
            } else {
                var error = "You have already voted on this poll."
                var backURL = req.header('Referer').split('?')[0] || '/';
                res.redirect(backURL + '?error=' + encodeURIComponent(error))
            }
        })
    } 
}

function updateUser( user, pollId ){
    user.votesCast.push( pollId )
    user.save();
}

function updatePoll( req, res, next, user ){
    var queryPoll = { _id: req.params.pollId, 'pollOptions._id': req.body.votePoll }
    var updateOption = { $inc: { 'pollOptions.$.votes': 1, totalVotes: 1 }, $set: { 'pollOptions.$.voters': user._id } }
    polls.findOneAndUpdate(queryPoll, updateOption, function (err, poll) {
        console.log(err)
        next()
    })
}

module.exports = voteForPoll;