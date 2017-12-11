'use strict'
var polls = require('../models/polls.js');

function createNewOption( req, res, next ){
    var queryPoll = { _id: req.params.pollId }
    var newOption = {
        option: req.body.newOption,
        votes: 0,
        voters: []
    };
    var updateOption = { $push: { pollOptions: newOption } }
    polls.findOneAndUpdate(queryPoll, updateOption, function (err, poll) {
        console.log(err)
        next()
    })

}

module.exports = createNewOption;