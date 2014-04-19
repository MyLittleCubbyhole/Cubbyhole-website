angular.module('Navigation').
	controller('NavigationController', ['$scope', '$window', '$location', 'UserFactory', function($scope, $window, $location, UserFactory){
		var $local = $scope.Navigation = {};

		$local.goto = function(path) {

			path += (path == '/manager' && UserFactory($scope).get()) ? "?token=" + UserFactory($scope).get().TOKEN : "";

			$window.location = path;
		};

		$local.isSelected = function(pathname, anchor) {
			return $location.$$path == anchor && $window.location.pathname == pathname;
		}

		$scope.toString = function() {
			return 'Navigation';
		}
	}])