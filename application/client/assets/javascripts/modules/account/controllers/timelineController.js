angular.module('Account').
	controller('TimelineController', ['$scope', function($scope){
		var $local = $scope.Timeline = {};

		$scope.toString = function() {
			return 'Timeline';
		}
	}])