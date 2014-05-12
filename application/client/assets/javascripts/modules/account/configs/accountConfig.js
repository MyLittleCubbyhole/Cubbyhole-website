angular.module('Account').
	config(['$locationProvider', '$routeProvider', '$httpProvider', function($location, $routeProvider, $httpProvider) {

        $routeProvider
        .when('/config', {
            templateUrl: '/templates/account/configuration',
            controller: 'ConfigurationController'
        })
        .when('/infos', {
            templateUrl: '/templates/account/information',
            controller: 'InformationsController'
        })
        .when('/timeline', {
            templateUrl: '/templates/account/timeline',
            controller: 'TimelineController'
        })
        .when('/plans', {
            templateUrl: '/templates/account/plans',
            controller: 'PlansController'
        })
        .otherwise({ redirectTo: '/config' });

		$location.html5Mode(false);

	}]);