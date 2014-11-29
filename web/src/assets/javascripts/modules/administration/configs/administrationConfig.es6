angular.module('Administration').
	config(['apiUrl', 'RestangularProvider','$locationProvider', '$routeProvider', '$httpProvider', function(apiUrl, restangular, $location, $routeProvider, $httpProvider) {

        //angular navigation
        restangular.setBaseUrl(apiUrl);
        $routeProvider
        .when('/users', {
            templateUrl: 'admin/users/jade',
            controller: 'UserAdministrationController'
        })
        .when('/plans', {
            templateUrl: 'admin/plans.jade',
            controller: 'PlanAdministrationController'
        })
        .otherwise({ redirectTo: '/users' });
        $httpProvider.interceptors.push('AuthenticationFactory');

		$location.html5Mode(false);

	}]);