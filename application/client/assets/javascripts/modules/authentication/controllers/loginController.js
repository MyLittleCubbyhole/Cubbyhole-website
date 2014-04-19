angular.module('Authentication').
    controller('LoginController', ['$scope', '$location', 'UserFactory', function($scope, $location, UserFactory) {
        var $local = $scope.Login = {};

        $local.isFormSubmited = false;

        $local.user = {};

        $local.authenticate = function(isValid) {
            $local.isFormSubmited = true;
            if(isValid) {
                UserFactory($scope).login($local.user);
            }
        };

        $local.goRegister = function() {
            $location.path("/register");
        };

        $scope.toString = function() {
            return 'Registration';
        };
    }]);