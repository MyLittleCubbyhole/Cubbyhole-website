angular.module('Account').
	config(['$locationProvider', '$routeProvider', '$httpProvider', function($location, $routeProvider, $httpProvider) {

        $routeProvider
        .when('/config', {
            templateUrl: '/templates/account/configuration',
            controller: 'configurationController'
        })
        .when('/infos', {
            templateUrl: '/templates/account/information',
            controller: 'informationsController'
        })
        .when('/timeline', {
            templateUrl: '/templates/account/timeline',
            controller: 'timelineController'
        })
        .when('/plans', {
            templateUrl: '/templates/account/plans',
            controller: 'plansController'
        })
        .otherwise({ redirectTo: '/config' });

		$location.html5Mode(false);

	}])