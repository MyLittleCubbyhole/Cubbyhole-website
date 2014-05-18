angular.module('Administration').
	controller('PlanAdministrationController', ['$scope', 'PlanFactory', function($scope, PlanFactory) {
		var $local = $scope.PlanAdministration = {};
		$local.selectedPlan = {};
		
        PlanFactory($scope).getAllPlans(function(error, plans) {
            console.log(plans)
            $local.plans = plans;
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
                downloadBandwidth: plan.downloadBandwidth,
                uploadBandwidth: plan.uploadBandwidth,
                quota: plan.quota
            };
        }

        $local.unselect = function() {
            $local.selectedPlan = {};
            for(var i = 0; i < $local.plans.length; i++) {
                $local.plans[i].selected = false;
                $local.plans[i].price = $local.plans[i].price / $local.plans[i].duration;
                $local.plans[i].duration = 1;
            }
        }

        $local.createPlan = function() {
            $local.unselect();
            $local.selectedPlan = {
                id: Math.round(Math.random()*1000000),
                price: 0,
                name: 'NEW',
                description: 'DESCRIPTION',
                storage: 0,
                downloadBandwidth: 0,
                uploadBandwidth: 0,
                quota: 0,
                new: true
            };
        }

		$scope.toString = function() {
			return 'PlanAdministration';
		}
	}])