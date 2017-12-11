'use strict'

var users = require('../models/users.js');
var polls = require( '../models/polls.js')

function deletePoll(req, res, next){
    console.log( 'removing poll: ' + req.params.pollId )
    polls.remove({ _id : req.params.pollId }, function(err,){
        if(err)
            console.log(err)
        next();
    })

}

module.exports = deletePoll;