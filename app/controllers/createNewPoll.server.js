'use strict'
var Poll = require('../models/polls.js');

function createNewPoll(req){
    var newPoll = new Poll();
    newPoll.owner = req.user._id;
    newPoll.title = req.body.title;
    newPoll.description = req.body.description;
    var options = req.body.options.split( /\r?\n|\r/g );
    newPoll.pollOptions = options;
    newPoll.totalVotes = 0;
    newPoll.save(function (err, updatedPoll) {
        if (err) {
            throw err;
        }
        req.user.postsCreated.push(updatedPoll._id);
        req.user.save(function(e){
           if(e)
             throw e; 
        });
    });
}

module.exports = createNewPoll;