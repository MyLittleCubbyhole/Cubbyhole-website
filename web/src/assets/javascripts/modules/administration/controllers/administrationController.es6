angular.module('Administration').
	controller('AdministrationController', ['$scope', '$location', function($scope, $location){
		var $local = $scope.Administration = {};

		/**
		 * navigate to the targeted path
		 * @param  {string} target path
		 */
		$local.goto = function(target) {
			$location.path('/' + target);
			console.log(target)
		}

		$scope.toString = function() {
			return 'Administration';
		}
	}])