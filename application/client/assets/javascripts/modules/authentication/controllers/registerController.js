angular.module('Authentication').
    controller('RegisterController', ['$scope', '$location', 'CountryFactory', 'UserFactory', function($scope, $location, CountryFactory, UserFactory) {
        var $local = $scope.Register = {};

        $local.showModal = false;

        $local.isFormSubmited = false;
        $local.errorPasswordMatch = false;


        $local.user = {};

        $local.errorRegister = false;

        $local.countries = CountryFactory($scope).list();

        $scope.$on('show_register_modal', function() {
            $local.showModal = true;
            $scope.$emit('enable_overlay');
        });

        $scope.$on('hide', function() {
            $local.showModal = false;
        });

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

        $scope.toString = function() {
            return 'Registration';
        };
    }]);