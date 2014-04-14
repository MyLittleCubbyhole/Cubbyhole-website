angular.module('CubbyHome').
	controller('CubbyHomeController', ['$scope', function($scope) {
		var $local = $scope.CubbyHome = {};


		$scope.toString = function() {
			return 'CubbyHome';
		}
	}]);