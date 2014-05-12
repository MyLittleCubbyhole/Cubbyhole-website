angular.module('Navigation').
	controller('NavigationController', ['$scope', '$window', '$location', 'UserFactory', function($scope, $window, $location, UserFactory){
		var $local = $scope.Navigation = {};

		$local.goto = function(path) {
			path += (path == '/manager' && UserFactory($scope).get()) ? "?token=" + UserFactory($scope).get().token : "";
			if(path.indexOf("/account") > -1) {
				var pathView = path.slice(0, path.indexOf("#"));
				var pathAngular = path.slice(path.indexOf("#"));

				path = pathView + "?token=" + UserFactory($scope).get().token + pathAngular;
			}

			console.log(path)

			$window.location = path;
		};

		$local.isSelected = function(pathname, anchor) {
			return $location.$$path == anchor && $window.location.pathname == pathname;
		}

		$local.isOnShared = function() {
			return ($location.$$absUrl.indexOf("/shared/") > -1);
		}

		$scope.toString = function() {
			return 'Navigation';
		}
	}])