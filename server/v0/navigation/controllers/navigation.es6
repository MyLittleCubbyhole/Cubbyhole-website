/*Parent class cloning*/

	var Controller = require('kanto-patterns').controller.clone();

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
		response.render('modules/home/home');
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