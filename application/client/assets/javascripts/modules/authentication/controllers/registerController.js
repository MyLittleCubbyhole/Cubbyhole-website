angular.module('Authentication').
    controller('RegisterController', ['$scope', '$location', 'CountryFactory', 'UserFactory', function($scope, $location, CountryFactory, UserFactory) {
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

        $local.goLogin = function() {
            $location.path("/login");
        };


        $scope.toString = function() {
            return 'Registration';
        };
    }]);