angular.module('Account').
	controller('PlansController', ['$scope', '$location', 'apiUrl', 'PlanFactory', function($scope, $location, apiUrl, PlanFactory){
		var $local = $scope.Plans = {};

        $local.selectedPlan = {};
        $local.plans = [];

        $local.select2Options = {
             minimumResultsForSearch: -1
        };

        PlanFactory($scope).getAllPlans(function(error, plans) {
            $local.plans = plans;

            if($location.$$search.planId)
                for(var i = 0; i < $local.plans.length; i++)
                    if($local.plans[i].id == $location.$$search.planId)
                        $local.selectPlan($local.plans[i]);
        });

        $local.selectPlan = function(plan) {
            plan.selected = true;
            $local.selectedPlan = {
                id: plan.id,
                price: plan.price,
                name: 'Plan ' + plan.name,
                description: plan.description,
                storage: plan.storage,
                duration: plan.duration,
                uploadBandwidth: plan.uploadBandwidth,
                downloadBandwidth: plan.downloadBandwidth,
                quota: plan.quota
            };
        }

        $local.changeDuration = function() {
            for(var i = 0; i < $local.plans.length; i++) {
                if($local.plans[i].selected) {
                    $local.plans[i].price = $local.plans[i].price / $local.plans[i].duration;
                    $local.plans[i].duration = $local.selectedPlan.duration;
                    $local.plans[i].price = $local.plans[i].price * $local.plans[i].duration;
                }
            }
        }

        $local.unselect = function() {
            $local.selectedPlan = {};
            for(var i = 0; i < $local.plans.length; i++) {
                $local.plans[i].selected = false;
                $local.plans[i].price = $local.plans[i].price / $local.plans[i].duration;
                $local.plans[i].duration = 1;
            }
        }

		$scope.toString = function() {
			return 'Plans';
		};
	}]);