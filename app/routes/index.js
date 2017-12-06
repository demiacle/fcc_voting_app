'use strict';

var path = process.cwd();
var p = require('path')
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function (app, passport) {
	app.set("view engine", "pug" )
	app.set("views", p.join(__dirname, "public"));

	function isLoggedIn (req, res, next) {
		console.log('w')
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

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
		
	app.route('/failed')
		.get(function (req, res) {
			res.send('login failed')
		});

	app.route('/profile')
		.get( function (req, res) {
			if( req.isAuthenticated() ){
				res.send('you are logged in');
			} else {
				res.send('you are logged out');
			}
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));
		
	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));
	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
                       successRedirect: '/',
                       failureRedirect: '/failed'
               }));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
                       successRedirect: '/',
                       failureRedirect: '/failed'
               }));

};
