angular.module('Administration').
	controller('AdministrationNavigationController', ['$scope', '$location', function($scope, $location){
		var $local = $scope.AdministrationNavigation = {};

		$local.goto = function(target) {
			$location.path('/' + target);
		}

		$scope.toString = function() {
			return 'AdministrationNavigation';
		}
	}])