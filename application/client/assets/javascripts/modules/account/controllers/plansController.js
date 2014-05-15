angular.module('Account').
	controller('PlansController', ['$scope', 'apiUrl', function($scope, apiUrl){
		var $local = $scope.Plans = {};

        $local.selectedPlan = {
            id: 2,
            price: 5.00,
            name: 'Plan ' + 'yolo',
            storage: 10737418240,
            duration: 5,
            uploadBandwidth: 2097152,
            downloadBandwith: 2097152,
            quota: 104857600,
            available: 1
        };

		$scope.toString = function() {
			return 'Plans';
		};
	}]);