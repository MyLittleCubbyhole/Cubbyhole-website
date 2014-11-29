/*Parent class cloning*/

	var Routing = require('kanto-patterns').routing.clone(__dirname);

/*Attributes definitions*/

	Routing._prefix = '/';
	Routing._versioning = true;

/*Overridden methods declarations*/

	Routing.init = init;
	Routing.declare = declare;

module.exports = Routing;

/*Overridden methods definitions*/

	function init() {
		this.loadDepsFilters('auth');
	}

	function declare(router) {
		router.get('/', this.controllers.navigation.redirect);
		router.get('/home', this.controllers.navigation.get.index);
		router.get('/account', this.deps.auth.filters.token.verifyToken, this.controllers.navigation.get.account);
		router.post('/account', this.deps.auth.filters.token.verifyToken, this.controllers.navigation.get.account);
		router.get('/manager', this.deps.auth.filters.token.verifyToken, this.controllers.navigation.get.filemanager);
		router.get('/admin', this.deps.auth.filters.token.isAdmin, this.controllers.navigation.get.admin);
		router.get('/shared/:id', this.controllers.navigation.get.shared);
	}