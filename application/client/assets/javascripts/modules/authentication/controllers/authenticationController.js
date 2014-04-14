angular.module('Authentication').
	controller('AuthenticationController', ['$scope', 'UserFactory', function($scope, UserFactory) {
		var $local = $scope.Authentication = {};
		
		//pour l'instant le temps d'avoir une authentification
		var user = { id: 0, username: 'Polochon'};
		UserFactory.set(user);
		//user = UserFactory.get();



		$local.user = user;
		$local.authenticated = false;

		$scope.toString = function() {
			return 'Authentication';
		}
	}])