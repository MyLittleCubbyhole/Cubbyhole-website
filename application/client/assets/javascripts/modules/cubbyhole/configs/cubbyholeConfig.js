angular.module('CubbyHole').
	config(['apiUrl', 'RestangularProvider', '$locationProvider', function(apiUrl, restangular, $location) {

		restangular.setBaseUrl(apiUrl);
		$location.html5Mode(false);

	}])