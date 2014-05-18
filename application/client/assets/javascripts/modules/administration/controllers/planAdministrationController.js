angular.module('Administration').
	controller('PlanAdministrationController', ['$scope', function($scope) {
		var $local = $scope.PlanAdministration = {};

		$scope.toString = function() {
			return 'PlanAdministration';
		}
	}])