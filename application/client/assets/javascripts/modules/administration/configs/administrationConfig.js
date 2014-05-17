angular.module('Administration').
	config(['$locationProvider', '$routeProvider', '$httpProvider', function($location, $routeProvider, $httpProvider) {

        $routeProvider
        .when('/users', {
            templateUrl: '/templates/admin/users',
            controller: 'UserAdministrationController'
        })
        .when('/plans', {
            templateUrl: '/templates/admin/plans',
            controller: 'PlanAdministrationController'
        })
        .otherwise({ redirectTo: '/users' });

		$location.html5Mode(false);

	}]);