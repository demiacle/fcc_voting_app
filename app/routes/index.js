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


// TODO remove login route
	app.route([ '/', '/login' ])
		.get(function (req, res) {
			// query db for title and votes
			// reorder query so created posts are first
			// truncate titles to about 50
			var vars = { polls: [
				{ title: 'hi', hasVoted: false, isCreator: true, votes: 3 },
				{ title: 'hddi', hasVoted: true, isCreator: false, votes: 2 },
				{ title: 'hfffadfadfasfasfdsadfasdfasdfasfdasdfasfdasfasfasdfasdfasf adf adsf asdfdfasdfasfasffafi', hasVoted: false, isCreator: false, votes: 5 },
				{ title: 'hf34321i', hasVoted: true, isCreator: true, votes: 7 },
				{ title: 'h09i', hasVoted: false, isCreator: true, votes: 9 }
				],
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
			res.render(path + '/public/index.pug', vars );
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
		.get( function( req, res, next ){
			passport.authenticate('github', function(err, user, info) {
				if(err)
					return res.status(500).json(err);
				if(!user)
					return res.status(401).json(info.message);
					
					console.log( user )
				res.json({})
			})(req, res, next )
		});

	app.route('/auth/github/callback')
		.get(function (req, res, next) {
			console.log( 'yea ')
			passport.authenticate('github', function(err, user, info) {
				if(err)
					return res.status(500).json(err);
				if(!user)
					return res.status(401).json(info.message);
					
					console.log( user )
				res.json({})
			})(req, res, next )
		});

};
