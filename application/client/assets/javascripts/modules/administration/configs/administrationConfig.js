angular.module('Administration').
	config(['$locationProvider', '$routeProvider', '$httpProvider', function($location, $routeProvider, $httpProvider) {

        $routeProvider
        .when('/users', {
            templateUrl: '/templates/admin/users',
            controller: 'ConfigurationController'
        })
        .when('/plans', {
            templateUrl: '/templates/admin/plans',
            controller: 'PlansController'
        })
        .otherwise({ redirectTo: '/config' });

		$location.html5Mode(false);

	}]);