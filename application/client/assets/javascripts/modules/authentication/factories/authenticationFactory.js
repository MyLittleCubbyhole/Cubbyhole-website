angular.module('Authentication').
    factory('AuthenticationFactory', function($window, $q) {
        return {
            request: function(config) {
                config.url += "?token=";
                config.url += localStorage.getItem('token') || "";

                return config || $q.when(config);
            },
            responseError: function(response) {
                return response || $q.when(response);
            }
        };
    });