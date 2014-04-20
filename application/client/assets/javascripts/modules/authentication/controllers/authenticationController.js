angular.module('Authentication').
	controller('AuthenticationController', ['$scope', 'UserFactory', function($scope, UserFactory) {
		var $local = $scope.Authentication = {};

		var user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};

		UserFactory($scope).set(user);


		$local.user = user;
		$local.authenticated = false;

		$local.opened = false;

		$scope.$on('hide', function() {
			$local.opened = false;
		});

		$local.open = function() {
			$local.opened = !$local.opened;
			$scope.$emit('unable_overlay');
		};

		$local.logout = function() {
			UserFactory($scope).logout();
		};

		$scope.toString = function() {
			return 'Authentication';
		};
	}])