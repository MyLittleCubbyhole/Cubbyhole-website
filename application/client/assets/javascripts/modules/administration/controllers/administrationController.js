angular.module('Administration').
	controller('AdministrationController', function($scope) {
		var $local = $scope.Administration = {};


		$scope.toString = function() {
			return 'Administration';
		}
	})