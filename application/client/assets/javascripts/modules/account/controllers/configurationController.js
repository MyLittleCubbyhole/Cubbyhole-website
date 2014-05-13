angular.module('Account').
	controller('ConfigurationController', ['$scope', 'CountryFactory', 'UserFactory', function($scope, CountryFactory, UserFactory){
		var $local = $scope.Configuration = {};

        $local.isFormSubmited = false;
        $local.errorNewPasswordMatch = false;

        $local.user = {};

        $local.errorUpdate = false;
        $local.updateSuccess = false;

        $local.countries = CountryFactory($scope).list();

        var user = UserFactory($scope).get();
        user.birthdate = new Date(user.birthdate);
        user.birthdate = user.birthdate.getDate() + '/' + (user.birthdate.getMonth() + 1) + '/' + user.birthdate.getFullYear();

        $local.user = {
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            birthdate: user.birthdate,
            country: user.country
        }

        $local.save = function(isValid) {
            $local.isFormSubmited = true;
            if(isValid) {
                if(($local.user.newPassword === undefined || $local.user.newPassword === '') || ($local.user.newPassword !== undefined && $local.user.newPassword !== '' && $local.user.newPassword == $local.user.newPassword2)) {
                    $local.errorNewPasswordMatch = false;

                    delete($local.user.newPassword2);

                    UserFactory($scope).updateUser($local.user, function(error) {
                        if(error)
                            $local.errorUpdate = true;
                        else {
                            $local.updateSuccess = true;
                            $local.errorUpdate = false;
                            delete($local.user.password);
                            delete($local.user.newPassword);
                            delete($local.user.newPassword2);
                            $local.isFormSubmited = false;
                            $scope.form.password.$dirty = false;
                            $scope.form.password.$invalid = false;
                        }
                    });
                } else {
                    $local.errorNewPasswordMatch = true;
                }
            }
        };

		$scope.toString = function() {
			return 'Configuration';
		}
	}])