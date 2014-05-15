angular.module('Authentication').
    controller('RegisterController', ['$scope', '$location', 'CountryFactory', 'UserFactory', 'apiUrl', function($scope, $location, CountryFactory, UserFactory, apiUrl) {
        var $local = $scope.Register = {};

        $local.isFormSubmited = false;
        $local.errorPasswordMatch = false;

        $local.user = {};

        $local.urlRegister = apiUrl + 'users';

        $local.errorRegister = $location.$$url.indexOf('?error') > -1 ? true : false;

        $local.countries = CountryFactory($scope).list();

        $local.save = function(isValid) {
            $local.isFormSubmited = true;
            if(isValid) {
                if($local.user.password === $local.user.password2) {
                    $local.errorPasswordMatch = false;
                    angular.element('#form-register').submit();
                } else
                    $local.errorPasswordMatch = true;
            }
        };

        $scope.toString = function() {
            return 'Registration';
        };
    }]);