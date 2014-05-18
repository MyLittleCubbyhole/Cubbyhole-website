angular.module('Administration').
	controller('UserAdministrationController', ['$scope', 'UserFactory', 'apiUrl', function($scope, UserFactory, apiUrl) {
		var $local = $scope.UserAdministration = {};
		$local.user = UserFactory($scope).get();
		$local.user.role = $local.user.roleid == 2? 'ADMINISTRATOR': 'USER';
		$local.users = new Array();
		UserFactory($scope).all(function(error, data) {
			if(!error)
				$local.users = data;

			for(var i = 0; i<$local.users.length; i++)
				$local.users[i].image = apiUrl + 'download/1/userPhotos/' + $local.users[i].photo + '?token=' + $local.user.token + '&run';
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