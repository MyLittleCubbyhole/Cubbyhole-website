/*Parent class cloning*/

	var Service = require('kanto-patterns').service.clone();

/*Services requiring*/

	var $http = require('http');

/*Attributes definitions*/

	Service._name = 'Token';

/*Overridden methods declarations*/

/*Private methods declarations*/

	Service._callTokenEndpoint = _callTokenEndpoint;

/*Public methods declarations*/

	Service.verifyToken = verifyToken;
	Service.isAdminToken = isAdminToken;
	Service.activation = activation;

module.exports = Service;

/*Overridden methods definitions*/

/*Private methods definitions*/

	function _callTokenEndpoint(token, endpoint) {
		return new Promise((resolve, reject) => {

			var req = $http.request({
				host: global.config.webserviceLocal.host,
				port: global.config.webserviceLocal.port,
				method: 'GET',
				path: '/api/' + endpoint + '?token=' + encodeURIComponent(token)
			}, (res) => {
				if(res.statusCode !== 200)
					reject('Token invalid');
				else
					resolve();
			});

			req.on('error', (err) => reject(err));
			req.end();
		});
	}

/*Public methods definitions*/

	function verifyToken(token = 0) {
		return this._callTokenEndpoint(token, 'checkToken');
	}

	function isAdminToken(token = 0) {
		return this._callTokenEndpoint(token, 'checkAdminToken');
	}

	function activation(token = 0) {
		return this._callTokenEndpoint(token, 'activation');
	}