/*Parent class cloning*/

	var Controller = require('kanto-patterns').controller.clone();

/*Services requiring*/
	var TokenService = require(__dirname + '/../services/token');

/*Attributes definitions*/

	Controller._name = 'Auth';

/*Overridden methods declarations*/

/*Private methods declarations*/

/*Public methods declarations*/

	Controller.activation = activation;

module.exports = Controller;

/*Overridden methods definitions*/

/*Private methods definitions*/

/*Public methods definitions*/

	function activation(request, response) {
		TokenService.activation(request.query.token)
			.then(() => response.redirect('/home#/confirmation'))
			.catch(() => response.redirect('/'));
	}