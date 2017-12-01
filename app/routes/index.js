'use strict';

var path = process.cwd();
var p = require('path')
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function (app, passport) {
	
	app.set("view engine", "pug" )
	app.set("views", p.join(__dirname, "public"));

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

// TODO remove login route
	app.route('/login')
		.get(function (req, res) {
			// query db for title and votes
			var polls = { polls: [
				{ title: 'hi', votes: 3 },
				{ title: 'hddi', votes: 2 },
				{ title: 'hfffafi', votes: 5 },
				{ title: 'hf34321i', votes: 7 },
				{ title: 'h09i', votes: 9 }
				]}
			res.render(path + '/public/login.pug', polls );
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
};
