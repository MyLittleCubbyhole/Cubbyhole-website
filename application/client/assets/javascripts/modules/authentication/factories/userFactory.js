angular.module('Authentication').
    factory('UserFactory', ['$window', '$http', 'apiUrl', function($window, $http, apiUrl){

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
                    $window.location = $window.location.protocol + "//" + $window.location.host + "/authentication#/login";
                }).
                error(function(data, status, headers, config) {
                    console.error(data);
                });
            };

            prototype.login = function(user) {
                $http.post(apiUrl + 'auth', user).
                success(function(data, status, headers, config) {
                    if(data && data.user && data.user.token) {
                        prototype.set(data.user);
                        localStorage.setItem('user', JSON.stringify(data.user));
                        $window.location = $window.location.protocol + "//" + $window.location.host + "/manager?token=" + data.user.token;
                    }
                }).
                error(function(data, status, headers, config) {
                    console.error(data);
                });
            };

            prototype.logout = function() {
                var user = prototype.get();
                if(user.token) {
                    $http.get(apiUrl + 'logout').
                    success(function(data, status, headers, config) {
                        localStorage.removeItem('user');
                        $window.location.reload();
                    }).
                    error(function(data, status, headers, config) {
                        localStorage.removeItem('user');
                        $window.location.reload();
                        console.error(data);
                    });
                }
            };

            return prototype;
        };
    }]);