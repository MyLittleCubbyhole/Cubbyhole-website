angular.module('Account').
	controller('PlansController', ['$scope', function($scope){
		var $local = $scope.Plans = {};

		$scope.toString = function() {
			return 'Plans';
		}
	}])