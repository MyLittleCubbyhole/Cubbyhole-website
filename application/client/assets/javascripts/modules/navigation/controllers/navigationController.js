angular.module('Navigation').
	controller('NavigationController', ['$scope', '$window', '$location', function($scope, $window, $location){
		var $local = $scope.Navigation = {};

		$local.goto = function(path) {
			$window.location = path;
		};

		$local.isSelected = function(pathname, anchor) {
			return $location.$$path == anchor && $window.location.pathname == pathname;
		}

		$scope.toString = function() {
			return 'Navigation';
		}
	}])