angular.module('Account').
	controller('NavigationController', ['$scope', '$location', function($scope, $location){
		var $local = $scope.Navigation = {};

		$local.goto = function(target) {
			$location.path('/' + target);
		}

		$scope.toString = function() {
			return 'Navigation';
		}
	}])