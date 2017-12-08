'use strict';

var path = process.cwd();
var parseUserData = require(path + '/app/controllers/parseUserData.server.js')
var createNewPoll = require(path + '/app/controllers/createNewPoll.server.js')
var getPollData = require(path + '/app/controllers/getPollData.server.js')
var getPolls = require(path + '/app/controllers/getPolls.server.js')

module.exports = function (app, passport) {

	function getUserData( req ){
		if (req.isAuthenticated()) {
			//console.log(req.user)
			var vars;
			if (req.user.github.id !== undefined) {
				vars = parseUserData(req.user.github)
			} else {
				vars = parseUserData(req.user.twitter)
			}
			return vars;
		} else {
			return {};
		}
	}


	app.route([ '/', '/login' ])
		.get( getPolls, function (req, res) {
			// Change to middleware
			if( req.isAuthenticated() ){
				//console.log(req.user)
				var vars;
				if( req.user.github.id !== undefined ){
					vars = parseUserData(req.user.github)
				} else {
					vars = parseUserData(req.user.twitter)
				}
				vars.polls = res.locals.polls;
				res.render(path + '/public/index.pug', vars );
				return;
			}
			
				//console.log('yo')
				console.log(res.locals.polls);
			// query db for title and votes
			// reorder query so created posts are first
			// truncate titles to about 50
			var vars = { polls: res.locals.polls }

			res.render(path + '/public/index.pug', vars );
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});
	app.route('/post/:id')
		.get( getPolls, function (req, res ){
			getPollData(req, res, getUserData( req ) );
		});
		
	app.route('/createNewPoll')
		.post( function(req, res) {
			if( req.isAuthenticated() ) {
				createNewPoll(req);
				res.redirect('/');
			} else {
				res.send()
			}
		})
	app.route('/newPollForm')
		.get( function(req, res) {
			if(req.isAuthenticated()){
				res.render(path + '/public/newPollForm.pug');
			} else {
				res.send('You must be logged in to do that')
			}
		})

	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));
	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
                       successRedirect: '/',
                       failureRedirect: '/failed'
               }));

	app.route('/auth/github')
		.get(passport.authenticate('github'));
	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
                       successRedirect: '/',
                       failureRedirect: '/failed'
               }));

};
