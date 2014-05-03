angular.module('Authentication').
    controller('RegisterController', ['$scope', '$location', 'CountryFactory', 'UserFactory', function($scope, $location, CountryFactory, UserFactory) {
        var $local = $scope.Register = {};

        $local.isFormSubmited = false;
        $local.errorPasswordMatch = false;

        $local.user = {};

        $local.errorRegister = false;

        $local.countries = CountryFactory($scope).list();

        $local.save = function(isValid) {
            $local.isFormSubmited = true;
            if(isValid) {
                if($local.user.password === $local.user.password2) {
                    $local.errorPasswordMatch = false;
                    UserFactory($scope).createUser($local.user, function(error) {
                        if(error)
                            $local.errorRegister = true;
                        else
                           $local.errorRegister = false;
                    });
                } else {
                    $local.errorPasswordMatch = true;
                }
            }
        };

        $local.goLogin = function() {
            $location.path("/login");
        };


        $scope.toString = function() {
            return 'Registration';
        };
    }]);