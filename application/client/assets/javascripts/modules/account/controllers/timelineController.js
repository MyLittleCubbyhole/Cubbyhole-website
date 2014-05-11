angular.module('Account').
	controller('TimelineController', ['$scope', 'UserFactory', function($scope, UserFactory){
		var $local = $scope.Timeline = {};

		UserFactory($scope).historic(function(data) {
			for(var i = 0; i<data.length; i++)
				data[i].date = new Date(data[i].date);
			$local.events = data;
		});

		$scope.toString = function() {
			return 'Timeline';
		}
	}])