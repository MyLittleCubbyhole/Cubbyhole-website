angular.module('Authentication').
    controller('LoginController', ['$scope', 'UserFactory', function($scope, UserFactory) {
        var $local = $scope.Login = {};

        $local.isFormSubmited = false;

        $local.user = {};

        $local.authenticate = function(isValid) {
            $local.isFormSubmited = true;
            if(isValid) {
                UserFactory($scope).login($local.user);
            }
        };

        $scope.toString = function() {
            return 'Registration';
        };
    }]);