angular.module('CubbyHome').
	controller('CubbyHomeController', ['$scope', '$location', 'PlanFactory', 'UserFactory', 'apiUrl', function($scope, $location, PlanFactory, UserFactory, apiUrl) {
		var $local = $scope.CubbyHome = {};

        $local.plans = [];
        $local.adminPhotos = [];
        for(var i = 1; i <= 5; i++)
            $local.adminPhotos.push({'background-image': 'url("' + apiUrl + 'download/1/userPhotos/adminPhoto' + i +'.jpg")'});

        $local.showModalRegister = false;
        $local.showModalLogin = false;
        $local.showModalConfirmation = false;

        $local.planUrl = '/account?token=';

        /**
         * LISTENER - triggered when the user is updated
         */
        $scope.$watch(UserFactory($scope).get(), function() {
            $local.planUrl += UserFactory($scope).get().token + '#/plans?planId=';
        });

        /**
         * LISTENER - hide modal when called
         */
        $scope.$on('hide', function() {
            $local.showModalLogin = false;
            $local.showModalRegister = false;
            $local.showModalConfirmation = false;
        });

        /**
         * show the register modal
         */
        $local.showRegisterModal = function() {
            $scope.Overlay.activated = true;
            $local.showModalLogin = false;
            $local.showModalRegister = true;
            $local.showModalConfirmation = false;
        }

        /**
         * show login modal
         */
        $local.showLoginModal = function() {
            $scope.Overlay.activated = true;
            $local.showModalRegister = false;
            $local.showModalLogin = true;
            $local.showModalConfirmation = false;
        }

        /**
         * show confirmation modal
         */
        $local.showConfirmationModal = function() {
            $scope.Overlay.activated = true;
            $local.showModalRegister = false;
            $local.showModalLogin = false;
            $local.showModalConfirmation = true;
        }

        if($location.path() == '/login')
            $local.showLoginModal();

        if($location.path() == '/register')
            $local.showRegisterModal();

        if($location.path() == '/confirmation')
            $local.showConfirmationModal();

        PlanFactory($scope).getAllPlans(function(error, plans) {
            $local.plans = plans;
            for(var i = 0; i < $local.plans.length; i++)
                $local.plans[i].photoUrl = {'background-image': 'url("' + $local.plans[i].photoUrl + '")'};
        });

		$scope.toString = function() {
			return 'CubbyHome';
		}
	}]);