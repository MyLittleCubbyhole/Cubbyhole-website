angular.module('Navigation').
	controller('NavigationController', ['$scope', '$window', '$location', 'UserFactory', '$document', function($scope, $window, $location, UserFactory, $document){
		var $local = $scope.Navigation = {};
 
		$local.goto = function(path, container) {
			path += (path == '/manager' && UserFactory($scope).get()) ? "?token=" + UserFactory($scope).get().token : "";
			var pathView = path.slice(0, path.indexOf("#"));
			var pathAngular = path.slice(path.indexOf("#"));

			if(path.indexOf("/account") > -1)
				path = pathView + "?token=" + UserFactory($scope).get().token + pathAngular;
			// console.log(pathAngular)
			if(path.indexOf("/home") > -1) {
				var target = angular.element(pathAngular)
				,	container = container ? angular.element(container) : $document;
				if(target.length>0) {
					// console.log($location)
					$local.scrollTo(target, container);
				}
				else
					container.scrollTop(0, 1000);
			}
			else
				$window.location = path;
		};

		$local.isSelected = function(pathname, anchor) {
			return $location.$$path == anchor && $window.location.pathname == pathname;
		}

		$local.scrollTo = function($node, $container) {
			$container = $container || $document
			$container.scrollToElement($node, 0, 1000).then(function() {
				console && console.log('You just scrolled to the top!');
			});
		}

		$local.isOnShared = function() {
			return ($location.$$absUrl.indexOf("/shared/") > -1);
		}

		$scope.toString = function() {
			return 'Navigation';
		}
	}])