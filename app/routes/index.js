'use strict';

var path = process.cwd();
var createNewPoll = require(path + '/app/controllers/createNewPoll.server.js')
var getPollData = require(path + '/app/controllers/getPollData.server.js')
var getPolls = require(path + '/app/controllers/getPolls.server.js')
var voteForPoll = require(path + '/app/controllers/voteForPoll.server.js')
var createNewOption = require(path + '/app/controllers/createNewOption.server.js')
var deletePoll = require(path + '/app/controllers/deletePoll.server.js')

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
		res.locals.renderVariables = { 
			polls: res.locals.polls,
			currentPoll: res.locals.currentPoll,
			error: req.query.error ? req.query.error : null
		}
		next();
	}

	app.route('/createNewOption/:pollId')
		.post( requireLoggedIn, createNewOption, function(req, res ){
			res.redirect('/poll/' + req.params.pollId)
		})
	app.route([ '/', '/login' ])
		.get( isLoggedIn, getPolls, parseLocalData, function (req, res) {
			res.render(path + '/public/index.pug', res.locals.renderVariables );
		});
	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});
	app.route('/vote/:pollId')
		.post(isLoggedIn, voteForPoll, parseLocalData, function( req, res ){
			res.redirect('/poll/' + req.params.pollId);
		})
	app.route('/poll/:id')
		.get( isLoggedIn, getPolls, getPollData, parseLocalData, function (req, res ){
			res.render(path + '/public/index.pug', res.locals.renderVariables)
		});
	app.route('/createNewPoll')
		.post( requireLoggedIn, function(req, res) {
			createNewPoll(req);
			res.redirect('/');
		})
	app.route('/deletePoll/:pollId')
		.get( requireLoggedIn, deletePoll, function(req, res) {
			res.redirect('/')
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
