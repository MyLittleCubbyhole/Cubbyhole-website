angular.module('Authentication').
    controller('RegisterController', ['$scope', '$location', 'CountryFactory', 'UserFactory', 'apiUrl', function($scope, $location, CountryFactory, UserFactory, apiUrl) {
        var $local = $scope.Register = {};

        $local.isFormSubmited = false;
        $local.errorPasswordMatch = false;

        $local.user = {countryCode: "0"};

        $local.urlRegister = apiUrl + 'users';

        $local.errorRegister = $location.$$url.indexOf('?error') > -1 ? true : false;

        $local.countries = CountryFactory($scope).list();

        /**
         * save the new user in database
         * @param  {Boolean} isValid form validity
         */
        $local.save = function(isValid) {
            $local.isFormSubmited = true;
            if(isValid) {
                if($local.user.password === $local.user.password2) {
                    $local.errorPasswordMatch = false;

                    angular.element('[name=countryCode]').val(CountryFactory($scope).getByName($local.user.country).code);

                    angular.element('#form-register').submit();
                } else
                    $local.errorPasswordMatch = true;
            }
        };

        $scope.toString = function() {
            return 'Registration';
        };
    }]);