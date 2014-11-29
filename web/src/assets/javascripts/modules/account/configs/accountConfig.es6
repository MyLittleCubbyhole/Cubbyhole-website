angular.module('Account').
	config(['$locationProvider', '$routeProvider', '$httpProvider', function($location, $routeProvider, $httpProvider) {

        //angular routing
        $routeProvider
        .when('/config', {
            templateUrl: 'account/configuration.jade',
            controller: 'ConfigurationController'
        })
        .when('/infos', {
            templateUrl: 'account/information.jade',
            controller: 'InformationsController'
        })
        .when('/timeline', {
            templateUrl: 'account/timeline.jade',
            controller: 'TimelineController'
        })
        .when('/plans', {
            templateUrl: 'account/plans.jade',
            controller: 'PlansController'
        })
        .otherwise({ redirectTo: '/config' });

		$location.html5Mode(false);

	}]);