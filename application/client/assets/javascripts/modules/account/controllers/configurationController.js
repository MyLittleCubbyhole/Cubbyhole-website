angular.module('Account').
	controller('ConfigurationController', ['$scope', function($scope){
		var $local = $scope.Configuration = {};

		$scope.toString = function() {
			return 'Configuration';
		}
	}])