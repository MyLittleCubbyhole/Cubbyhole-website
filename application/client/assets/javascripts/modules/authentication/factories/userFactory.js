angular.module('Authentication').
    factory('UserFactory', ['$http', 'apiUrl', function($http, apiUrl){

        var _user = {};

        return function($scope) {

            if(!$scope)
                throw 'a scope must be defined ';

            var prototype = {};

            prototype.get = function() {
                return _user;
            };

            prototype.set = function(user) {
                angular.extend(_user, user);
            };

            prototype.createUser = function(user) {
                $http.post(apiUrl + 'users', user).
                success(function(data, status, headers, config) {
                    console.log(data);
                }).
                error(function(data, status, headers, config) {
                    console.error(data);
                });
            };

            prototype.login = function(user) {
                $http.post(apiUrl + 'auth', user).
                success(function(data, status, headers, config) {
                    if(data && data.user && data.user.TOKEN) {
                        prototype.set(data.user);
                        localStorage.setItem('user', JSON.stringify(data.user));
                    }
                }).
                error(function(data, status, headers, config) {
                    console.error(data);
                });
            };

            return prototype;
        };
    }]);