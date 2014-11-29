angular.module('CubbyHole').
	controller('CubbyHoleController', ['$scope', function($scope) {
		var $local = $scope.CubbyHole = {};


		$scope.toString = function() {
			return 'CubbyHole';
		}
	}]);