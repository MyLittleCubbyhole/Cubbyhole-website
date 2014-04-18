angular.module('CubbyHole').
	config(['apiUrl', 'RestangularProvider', '$locationProvider', '$httpProvider', function(apiUrl, restangular, $location, $httpProvider) {

		restangular.setBaseUrl(apiUrl);
		$location.html5Mode(false);

        $httpProvider.interceptors.push('AuthenticationFactory');

	}])