/*angular.module('CubbyHome').
	config(['$locationProvider', '$routeProvider', '$httpProvider', function($location, $routeProvider, $httpProvider) {

        $routeProvider
        .when('/register', {
            templateUrl: '/partials/register'
        })
        .when('/login', {
            templateUrl: '/partials/authentication'
        })
        .when('/confirmation', {
            templateUrl: '/partials/confirmation'
        })
        .otherwise({ redirectTo: '/login' });

		$location.html5Mode(false);

        $httpProvider.interceptors.push('AuthenticationFactory');

	}])*/