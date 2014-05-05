angular.module('Authentication').
	controller('AuthenticationController', ['$scope', 'UserFactory', function($scope, UserFactory) {
		var $local = $scope.Authentication = {};

		var user = localStorage.getItem('user');
		if(!user)
			user = sessionStorage.getItem('user');

		if(user)
			user = JSON.parse(user);
		else
			user = {};

		UserFactory($scope).set(user);


		$local.user = user;
		$local.authenticated = false;

		$local.opened = false;

		$scope.$on('hide', function() {
			$local.opened = false;
		});

		$local.open = function() {
			$local.opened = !$local.opened;
			$scope.$emit('enable_overlay');
		};

		$local.logout = function() {
			UserFactory($scope).logout();
		};

		$scope.toString = function() {
			return 'Authentication';
		};
	}])