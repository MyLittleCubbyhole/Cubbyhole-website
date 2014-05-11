angular.module('CubbyHome').
	controller('CubbyHomeController', ['$scope', function($scope) {
		var $local = $scope.CubbyHome = {};

        $local.showRegisterModal = function() {
            $scope.$broadcast('hide');
            $scope.$broadcast('show_register_modal');
        }

        $local.showLoginModal = function() {
            $scope.$broadcast('hide');
            $scope.$broadcast('show_login_modal');
        }

		$scope.toString = function() {
			return 'CubbyHome';
		}
	}]);