'use strict';

var Users = require('../models/users.js');
var MongoClient = require('mongodb').MongoClient;

function parseUserData ( user ) {
    // get all polls
    var vars = { polls: [
				{ title: 'hi', hasVoted: false, isCreator: true, votes: 3 },
				{ title: 'hddi', hasVoted: true, isCreator: false, votes: 2 },
				{ title: 'hfffadfadfasfasfdsadfasdfasdfasfdasdfasfdasfasfasdfasdfasf adf adsf asdfdfasdfasfasffafi', hasVoted: false, isCreator: false, votes: 5 },
				{ title: 'hf34321i', hasVoted: true, isCreator: true, votes: 7 },
				{ title: 'h09i', hasVoted: false, isCreator: true, votes: 9 }
				],
                isLoggedIn: true,
                userDisplayName: user.displayName,
				selectOptions: [
					{
						id: 'someId',
						var_name: 'someVarName'
					},
					{
						id: 'someOtherId',
						var_name: 'someOtherName'
					}
				]
            }
            
    return vars;
}

module.exports = parseUserData;
