angular.module('Account').
	controller('AccountNavigationController', ['$scope', '$location', function($scope, $location){
		var $local = $scope.AccountNavigation = {};

		/**
		 * navigate to the selected path
		 * @param  {string} target target path
		 */
		$local.goto = function(target) {
			$location.path('/' + target);
		}

		$scope.toString = function() {
			return 'AccountNavigation';
		}
	}])