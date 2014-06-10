angular.module('Administration').
	controller('PlanAdministrationController', ['$scope', 'PlanFactory', function($scope, PlanFactory) {
		var $local = $scope.PlanAdministration = {};
		$local.selectedPlan = {};
		$local.plans = [];

        PlanFactory($scope).getAllPlans(function(error, plans) {
            $local.plans = plans;
        });

        $local.selectPlan = function(plan) {
            plan.selected = true;
            $local.selectedPlan = {
                id: plan.id,
                price: plan.price,
                name: plan.name,
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
                duration: 1,
                downloadBandwidth: 0,
                uploadBandwidth: 0,
                quota: 0,
                new: true
            };
        }

        $local.delete = function($event, index) {
            $event.stopPropagation();
            $event.preventDefault();
            PlanFactory($scope, {local: $local}).delete($local.plans[index].id, function() {
                PlanFactory($scope).getAllPlans(function(error, plans) {
                    $local.plans = plans;
                });
            });
            // $local.plans.splice(index, 1)
        }

        $local.save = function(isValid) {
            if(isValid)
                if($local.selectedPlan.new)
                    PlanFactory($scope, {local: $local}).create($local.selectedPlan)
                else
                    PlanFactory($scope, {local: $local}).edit($local.selectedPlan, function() {
                        PlanFactory($scope).getAllPlans(function(error, plans) {
                            $local.plans = plans;
                        });
                    })
        }

		$scope.toString = function() {
			return 'PlanAdministration';
		}
	}])