/*Parent class cloning*/

	var Controller = require('kanto-patterns').controller.clone();

/*Service requiring*/

	var webUrl = global.config.web.protocol + '://' + global.config.web.host + ':' + global.config.web.port + '/',
	    webserviceUrl = global.config.webservice.protocol + '://' + global.config.webservice.host + ':' + global.config.webservice.port + '/',
	    webserviceUrlLocal = global.config.webserviceLocal.protocol + '://' + global.config.webserviceLocal.host + ':' + global.config.webserviceLocal.port + '/';

/*Attributes definitions*/

	Controller._name = 'Navigation';

/*Overridden methods declarations*/

/*Private methods declarations*/

/*Public methods declarations*/

	Controller.redirect = redirectHome;
	Controller.get.index = getIndex;
	Controller.get.account = getAccount;
	Controller.get.filemanager = getFilemanager;
	Controller.get.admin = getAdmin;
	Controller.get.shared = getShared;

module.exports = Controller;

/*Overridden methods definitions*/

/*Private methods definitions*/

/*Public methods definitions*/

	function redirectHome(request, response) {
		response.redirect('/home');
	}

	function getIndex(request, response) {
		response.render('modules/home/home', {
			formRegisterUrl: webserviceUrl +
				'api/users?redirectSuccess=' +
				encodeURIComponent(webUrl + 'home#login') +
				'&redirectError=' +
				encodeURIComponent(webUrl + 'home#register?error')
		});
	}

	function getAccount(request, response) {
		response.render('modules/account/account');
	}

	function getFilemanager(request, response) {
		response.render('modules/filemanager/filemanager');
	}

	function getAdmin(request, response) {
		response.render('modules/admin/admin');
	}

	function getShared(request, response) {
		response.render('modules/shared/shared');
	}