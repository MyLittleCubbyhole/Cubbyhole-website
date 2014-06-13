angular.module('Administration').
	controller('UserAdministrationController', ['$scope', 'UserFactory', 'apiUrl', '$timeout', function($scope, UserFactory, apiUrl, $timeout) {
		var $local = $scope.UserAdministration = {}
		,	timer = null;
		$local.user = UserFactory($scope).get();
		$local.user.role = $local.user.roleid == 2? 'ADMINISTRATOR': 'USER';
		$local.users = new Array();
		UserFactory($scope).all(init, {});

		$local.filter = {
			user: false,
			admin: false
		}

		$local.apply = function() {
			$timeout.cancel(timer);

			var options = { role: false, email: false};

			options.role = ($local.filter.user || $local.filter.admin) && !( !!$local.filter.admin && !!$local.filter.user ) ? ( $local.filter.user ? 1 : 2 ) : false;

			options.email = $local.filter.search && $local.filter.search.length > 3 ? $local.filter.search : false;

			timer = $timeout(function() {
				$local.users.splice(0);
				UserFactory($scope).all(init, options);
			}, 200);
		}

		function init(error, data) {
			if(!error)
				$local.users = data;

			for(var i = 0; i<$local.users.length; i++)
				$local.users[i].image = apiUrl + 'download/1/userPhotos/' + $local.users[i].photo + '?token=' + $local.user.token + '&run';
		}

		$scope.toString = function() {
			return 'UserAdministration';
		}
	}])