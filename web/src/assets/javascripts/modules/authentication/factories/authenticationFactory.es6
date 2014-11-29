angular.module('Authentication').
    factory('AuthenticationFactory', ['$window', '$q', function($window, $q) {
        return {
            request: function(config) {

                config.url += config.url.indexOf('?') > -1 ? '&' : '?';

                config.url += 'token=';

                var user = localStorage.getItem('user');
                if(!user)
                    user = sessionStorage.getItem('user');
                if(user)
                    config.url += JSON.parse(user).token || '';

                return config || $q.when(config);
            },
            responseError: function(response) {
                return response || $q.when(response);
            }
        };
    }]);