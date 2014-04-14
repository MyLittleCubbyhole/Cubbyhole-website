angular.module('Authentication').
	factory('UserFactory', function(){

		var prototype = {}
		,	_user = {};

		prototype.get = function() {
			return _user;
		}

		prototype.set = function(user) {
			angular.extend(_user, user);
		}

		return prototype;
	})