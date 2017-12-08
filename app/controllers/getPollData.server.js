'use strict'
var mongoose = require('mongoose')
var pollSchema = require(path + '/app/models/polls.js')

function getPollData(req, res, id){

    pollSchema.findOne({ _id: id}, 'totalVotes description title owner pollOptions', function(err, poll){
        if(err)
            throw err;
        
        res.render(path + '/public/index.pug', vars)
    })

}

module.exports = getPollData;