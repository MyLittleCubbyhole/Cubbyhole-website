/*Parent class cloning*/

	var Filter = require('kanto-patterns').filter.clone();

/*Services requiring*/

	var TokenService = require(__dirname + '/../services/token');

/*Attributes definitions*/

	Filter._name = 'Token';

/*Overridden methods declarations*/

/*Private methods declarations*/

/*Public methods declarations*/

	Filter.verifyToken = verifyToken;
	Filter.isAdmin = isAdmin;

module.exports = Filter;

/*Overridden methods definitions*/

/*Private methods definitions*/

/*Public methods definitions*/

	function verifyToken(request, response, next) {
		TokenService.verifyToken(request.query.token)
			.then(() => next())
			.catch(() => response.redirect('/home#/login'));
	}

	function isAdmin(request, response, next) {
		TokenService.isAdminToken(request.query.token)
			.then(() => next())
			.catch(() => response.redirect('/home#/login'));
	}
