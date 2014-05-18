angular.module('Administration').
	config(['apiUrl', 'RestangularProvider','$locationProvider', '$routeProvider', '$httpProvider', function(apiUrl, restangular, $location, $routeProvider, $httpProvider) {

        restangular.setBaseUrl(apiUrl);
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
        $httpProvider.interceptors.push('AuthenticationFactory');

		$location.html5Mode(false);

	}]);