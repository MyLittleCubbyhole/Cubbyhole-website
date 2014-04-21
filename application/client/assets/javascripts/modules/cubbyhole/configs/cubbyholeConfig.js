angular.module('CubbyHole').
	config(['apiUrl', 'RestangularProvider', '$locationProvider', '$httpProvider', '$sceDelegateProvider', function(apiUrl, restangular, $location, $httpProvider, $sceDelegateProvider) {

		restangular.setBaseUrl(apiUrl);
		$location.html5Mode(false);

        $httpProvider.interceptors.push('AuthenticationFactory');

        $sceDelegateProvider.resourceUrlWhitelist([
           'self',
           apiUrl + '**'
        ]);
    }]);