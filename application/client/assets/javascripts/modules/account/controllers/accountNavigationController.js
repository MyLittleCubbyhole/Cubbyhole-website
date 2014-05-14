angular.module('Account').
	controller('AccountNavigationController', ['$scope', '$location', function($scope, $location){
		var $local = $scope.AccountNavigation = {};

		$local.goto = function(target) {
			$location.path('/' + target);
		}

		$scope.toString = function() {
			return 'AccountNavigation';
		}
	}])