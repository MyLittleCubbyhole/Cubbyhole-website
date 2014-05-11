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

            prototype.createUser = function(user, callback) {
                $http.post(apiUrl + 'users', user).
                success(function(data, status, headers, config) {
                    if(data && data.user && data.user.id) {
                        callback.call(this, null);
                        $window.location = $window.location.protocol + "//" + $window.location.host + "/authentication#/login";
                    }
                    else
                        callback.call(this, 'registration failed');
                }).
                error(function(data, status, headers, config) {
                    callback.call(this, 'registration failed');
                    console.error(data);
                });
            };

            prototype.login = function(user, rememberMe, callback) {
                $http.post(apiUrl + 'auth', user).
                success(function(data, status, headers, config) {
                    if(data && data.user && data.user.token) {
                        prototype.set(data.user);
                        if(rememberMe)
                            localStorage.setItem('user', JSON.stringify(data.user));
                        else
                            sessionStorage.setItem('user', JSON.stringify(data.user));

                        callback.call(this, null);

                        $window.location = $window.location.protocol + "//" + $window.location.host + "/manager?token=" + data.user.token;
                    } else {
                        callback.call(this, 'authentication failed');
                    }
                }).
                error(function(data, status, headers, config) {
                    callback.call(this, 'authentication failed');
                    console.error(data);
                });
            };

            prototype.logout = function() {
                var user = prototype.get();
                if(user.token) {
                    $http.get(apiUrl + 'logout').
                    success(function(data, status, headers, config) {
                        localStorage.removeItem('user');
                        sessionStorage.removeItem('user');
                        $window.location.reload();
                    }).
                    error(function(data, status, headers, config) {
                        localStorage.removeItem('user');
                        sessionStorage.removeItem('user');
                        $window.location.reload();
                        console.error(data);
                    });
                }
            };

            prototype.historic = function(callback) {
                var user = prototype.get();
                $http.get(apiUrl + 'users/'+user.id+'/historic').
                success(callback).
                error(function(data, status, headers, config) {
                    console.error(status, data);
                });
            }

            return prototype;
        };
    }]);