angular.module('Authentication').
    controller('LoginController', ['$scope', '$location', 'UserFactory', function($scope, $location, UserFactory) {
        var $local = $scope.Login = {};

        $local.showModal = false;

        $local.isFormSubmited = false;

        $local.user = {};

        $local.rememberMe = true;

        $local.errorLogin = false;

        localStorage.removeItem("user");
        sessionStorage.removeItem("user");

        $scope.$on('show_login_modal', function() {
            $local.showModal = true;
            $scope.$emit('enable_overlay');
        });

        $scope.$on('hide', function() {
            $local.showModal = false;
        });

        $local.authenticate = function(isValid) {
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
            return 'Registration';
        };
    }]);