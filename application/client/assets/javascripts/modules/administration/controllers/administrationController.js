angular.module('Administration').
	controller('AdministrationController', ['$scope', function($scope) {
		var $local = $scope.Administration = {};


		$scope.toString = function() {
			return 'Administration';
		}
	}])