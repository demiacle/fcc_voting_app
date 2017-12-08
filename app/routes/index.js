'use strict';

var path = process.cwd();
var parseUserData = require(path + '/app/controllers/parseUserData.server.js')
var createNewPoll = require(path + '/app/controllers/createNewPoll.server.js')
var getPollData = require(path + '/app/controllers/getPollData.server.js')
var getPolls = require(path + '/app/controllers/getPolls.server.js')

module.exports = function (app, passport) {
	//console.log(req.user)
	function isLoggedIn(req, res, next){
		if( req.isAuthenticated() ){
			res.locals.isLoggedIn = true;
			next();
		} else {
			next();
		}
	}
	function requireLoggedIn( req, res, next ){
		if( req.isAuthenticated() ){
			next();
		} else {
			res.redirect('/');
		}
	}
	function parseLocalData (req, res, next){
		console.log( 'LOCALS ARE')
		console.log( res.locals )
		next();
	}

	app.route([ '/', '/login' ])
		.get( getPolls, isLoggedIn, parseLocalData, function (req, res) {
			var vars = { polls: res.locals.polls }
			res.render(path + '/public/index.pug', vars );
		});
	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});
	app.route('/post/:id')
		.get( getPolls, isLoggedIn, getPollData, parseLocalData, function (req, res ){
			res.render(path + '/public/index.pug')
		});
	app.route('/createNewPoll')
		.post( requireLoggedIn, function(req, res) {
			createNewPoll(req);
			res.redirect('/');
		})
	app.route('/newPollForm')
		.get( requireLoggedIn, isLoggedIn, function(req, res) {
			res.render(path + '/public/newPollForm.pug');
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
