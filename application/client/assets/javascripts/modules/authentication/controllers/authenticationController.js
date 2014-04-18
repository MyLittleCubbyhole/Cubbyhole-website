angular.module('Authentication').
	controller('AuthenticationController', ['$scope', 'UserFactory', function($scope, UserFactory) {
		var $local = $scope.Authentication = {};

		//pour l'instant le temps d'avoir une authentification
		var user = { id: 0, username: 'Polochon'};
		UserFactory($scope).set(user);
		//user = UserFactory.get();


		$local.user = user;
		$local.authenticated = false;

		$local.opened = false;

		$scope.$on('hide', function() {
			$local.opened = false;
		})

		$local.open = function() {
			$local.opened = !$local.opened;
			$scope.$emit('unable_overlay');
		};

		$scope.toString = function() {
			return 'Authentication';
		}
	}])