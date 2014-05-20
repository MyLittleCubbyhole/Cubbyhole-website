angular.module('Account').
	controller('ConfigurationController', ['$scope', 'CountryFactory', 'apiUrl', 'UserFactory', function($scope, CountryFactory, apiUrl, UserFactory){
		var $local = $scope.Configuration = {};

        $local.isFormSubmited = false;
        $local.errorNewPasswordMatch = false;

        $local.user = {};

        $local.errorUpdate = false;
        $local.updateSuccess = false;

        $local.countries = CountryFactory($scope).list();

        var birthdate = new Date($scope.Account.user.birthdate).getDate() + '/' + (new Date($scope.Account.user.birthdate).getMonth() + 1) + '/' + new Date($scope.Account.user.birthdate).getFullYear();

        $local.user = {
            email: $scope.Account.user.email,
            firstname: $scope.Account.user.firstname,
            lastname: $scope.Account.user.lastname,
            birthdate: birthdate,
            country: $scope.Account.user.country,
            photo: $scope.Account.user.photo
        };

        if($scope.Account.user.photo && $scope.Account.user.photo != 'null')
            $local.stylePhoto = {'background-image': 'url(' + apiUrl + 'download/1/userPhotos/' + $scope.Account.user.photo + '?token=' + $scope.Account.user.token + '&run)'};

        $local.save = function(isValid) {
            $local.isFormSubmited = true;
            if(isValid) {
                if(($local.user.newPassword === undefined || $local.user.newPassword === '') || ($local.user.newPassword !== undefined && $local.user.newPassword !== '' && $local.user.newPassword == $local.user.newPassword2)) {
                    $local.errorNewPasswordMatch = false;

                    delete($local.user.newPassword2);

                    $local.user.countryCode = CountryFactory($scope).getByName($local.user.country).code;

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