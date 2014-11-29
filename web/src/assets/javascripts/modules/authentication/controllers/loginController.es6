angular.module('Authentication').
    controller('LoginController', ['$scope', '$location', 'apiUrl', 'UserFactory', function($scope, $location, apiUrl, UserFactory) {
        var $local = $scope.Login = {};

        $local.isFormSubmited = false;

        $local.formUrl = apiUrl + 'auth';

        $local.user = {};

        $local.rememberMe = true;

        $local.errorLogin = false;

        /**
         * authenticate the user 
         * @param  {Boolean} isValid form validity
         */
        $local.authenticate = function(isValid) {
            localStorage.removeItem('user');
            sessionStorage.removeItem('user');
            $local.isFormSubmited = true;
            if(isValid) {
                UserFactory($scope).login($local.user, $local.rememberMe, function(error) {
                    if(error)
                        $local.errorLogin = true;
                    else
                       $local.errorLogin = false;
                });
            }
        };

        $scope.toString = function() {
            return 'Login';
        };
    }]);