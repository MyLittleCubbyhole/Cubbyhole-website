angular.module('Administration').
	controller('UserAdministrationController', ['$scope', 'UserFactory', 'apiUrl', function($scope, UserFactory, apiUrl) {
		var $local = $scope.UserAdministration = {};
		var user = UserFactory($scope).get();
		$local.users = new Array();
		UserFactory($scope).all(function(error, data) {
			if(!error)
				$local.users = data;

			for(var i = 0; i<$local.users.length; i++)
				$local.users[i].image = apiUrl + 'download/1/userPhotos/' + $local.users[i].photo + '?token=' + user.token + '&run';
		});

		$local.filter = {
			user: false,
			admin: false
		}

		$local.applyRole = function(user) {
			if(user.roleid == 2)
				UserFactory($scope).promote(user);
			else
				UserFactory($scope).demote(user);
		}

		$scope.toString = function() {
			return 'UserAdministration';
		}
	}])