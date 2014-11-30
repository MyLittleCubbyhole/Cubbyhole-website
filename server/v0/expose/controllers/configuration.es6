/*Parent class cloning*/

	var Controller = require('kanto-patterns').controller.clone();

/*Service requiring*/

var webUrl = global.config.web.protocol + '://' + global.config.web.host + ':' + global.config.web.port + '/',
    webserviceUrl = global.config.webservice.protocol + '://' + global.config.webservice.host + ':' + global.config.webservice.port + '/',
    webserviceUrlLocal = global.config.webserviceLocal.protocol + '://' + global.config.webserviceLocal.host + ':' + global.config.webserviceLocal.port + '/';

/*Attributes definitions*/

	Controller._name = 'Configuration';

/*Overridden methods declarations*/

/*Private methods declarations*/

/*Public methods declarations*/

	Controller.get.paypal = getPaypal;
	Controller.get.formRegisterUrl = getFormRegisterUrl;

module.exports = Controller;

/*Overridden methods definitions*/

/*Private methods definitions*/

/*Public methods definitions*/

	function getPaypal(request, response) {
		response.render('modules/expose/json.jade', {name: '__paypalConfig', content: {
			paypalUrl: global.parameters.paypal_url,
			notifyUrl: webserviceUrlLocal + 'api/paypalNotify',
			returnUrl: webUrl + 'account?token=',
			cancelUrl: webUrl + 'account?token=',
			paypalBusinessEmail: global.parameters.paypal_business_email
		}});
		response.end();
	}

	function getFormRegisterUrl(request, response) {
		response.render('modules/expose/json.jade', {name: '__formRegister', content: {
			url: webserviceUrl + 'api/users?redirectSuccess=' +
			encodeURIComponent(webUrl + 'home#login') + '&redirectError=' +
			encodeURIComponent(webUrl + 'home#register?error')
		}});
		response.end();
	}