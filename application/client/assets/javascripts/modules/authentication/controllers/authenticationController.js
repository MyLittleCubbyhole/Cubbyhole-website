angular.module('Authentication').
	controller('AuthenticationController', ['$scope', 'UserFactory', 'apiUrl', function($scope, UserFactory, apiUrl) {
		var $local = $scope.Authentication = {};

		var user = localStorage.getItem('user');
		if(!user)
			user = sessionStorage.getItem('user');

		if(user)
			user = JSON.parse(user);
		else
			user = {};

		UserFactory($scope).set(user);

		$local.stylePhoto = {};

		if(user.photo && user.photo != 'null')
			$local.stylePhoto = {'background-image': 'url(' + apiUrl + 'download/1/userPhotos/' + user.photo + '?token=' + user.token + '&run)'};

		$local.user = user;
		$local.authenticated = false;

		$local.opened = false;

		$scope.$on('hide', function() {
			$local.opened = false;
		});

		$local.open = function() {
			$local.opened = !$local.opened;
			$scope.Overlay.activated = true;
		};

		$local.logout = function() {
			UserFactory($scope).logout();
		};

		$scope.toString = function() {
			return 'Authentication';
		};
	}])