'use strict'
var mongoose = require('mongoose')
var path = process.cwd();
var pollSchema = require(path + '/app/models/polls.js')

function getPollData(req, res, vars){
//console.log( 'searching id')
//console.log( req.params.id)
    var query = { _id: req.params.id }
    var projection = 'totalVotes description owner pollOptions'
    pollSchema.findOne( query, projection, function(err, poll){
        if(err)
            throw err;
        vars.currentPoll = poll;
        console.log('VARS')
        console.log( vars )
        
        // check if voted and created HERE
        res.render(path + '/public/index.pug', vars)
        //next();
    })
}

module.exports = getPollData;