angular.module('Overlay').
	controller('OverlayController', ['$scope', function($scope){
		var $local = $scope.Overlay = {};

		$local.activated = false;

		/**
		 * LISTENER - active the overlay
		 */
		$scope.$on('enable_overlay', function() { $local.activated = true; });

		/**
		 * disabled the overlay and all the modals
		 */
		$local.clickout = function() {
			$local.activated = false;
			$scope.$broadcast('hide');
		};

		$scope.toString = function() {
			return 'Overlay';
		};
	}]);