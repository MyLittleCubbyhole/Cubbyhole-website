angular.module('Authentication').
    controller('RegisterController', ['$scope', 'CountryFactory', 'UserFactory', function($scope, CountryFactory, UserFactory) {
        var $local = $scope.Register = {};

        $local.isFormSubmited = false;
        $local.errorPasswordMatch = false;

        $local.user = {};
        $local.user.country = CountryFactory($scope).get('FR').name;

        $local.countries = CountryFactory($scope).list();

        $local.save = function(isValid) {
            $local.isFormSubmited = true;
            if(isValid) {
                if($local.user.password === $local.user.password2) {
                    $local.errorPasswordMatch = false;
                    UserFactory($scope).createUser($local.user);
                } else {
                    $local.errorPasswordMatch = true;
                }
            }
        };

        $scope.toString = function() {
            return 'Registration';
        };
    }]);