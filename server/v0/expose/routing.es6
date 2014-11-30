/*Parent class cloning*/

	var Routing = require('kanto-patterns').routing.clone(__dirname);

/*Attributes definitions*/

	Routing._prefix = '/expose';
	Routing._versioning = true;

/*Overridden methods declarations*/

	Routing.declare = declare;

module.exports = Routing;

/*Overridden methods definitions*/

	function declare(router) {
		router.get('/paypal/config', this.controllers.configuration.get.paypal);
		router.get('/formRegister/config', this.controllers.configuration.get.paypal);
	}