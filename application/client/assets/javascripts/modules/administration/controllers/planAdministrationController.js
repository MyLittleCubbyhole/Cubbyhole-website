angular.module('Administration').
	controller('PlanAdministrationController', ['$scope', function($scope) {
		var $local = $scope.PlanAdministration = {};
		$local.selectedPlan = {};
		$local.plans = [
  {
    "id": 1,
    "photo": null,
    "price": 0,
    "name": "Tutti frutti",
    "description": "Free plan to test our services.",
    "storage": 3221225472,
    "duration": 1,
    "uploadbandwidth": 512000,
    "downloadbandwidth": 512000,
    "quota": 104857600,
    "available": 1
  },
  {
    "id": 2,
    "photo": null,
    "price": 10,
    "name": "Cheapy",
    "description": "Cheap plan for students.",
    "storage": 21474836480,
    "duration": 1,
    "uploadbandwidth": 1048576,
    "downloadbandwidth": 2097152,
    "quota": 524288000,
    "available": 1
  },
  {
    "id": 3,
    "photo": null,
    "price": 30,
    "name": "Top moumoute",
    "description": "Best plan to store your personnal documents.",
    "storage": 53687091200,
    "duration": 1,
    "uploadbandwidth": 5242880,
    "downloadbandwidth": 5242880,
    "quota": 2147483648,
    "available": 1
  },
  {
    "id": 4,
    "photo": null,
    "price": 80,
    "name": "Highlander",
    "description": "Best plan ever. Almost everything is unlimited. Almost.",
    "storage": 10995116277760,
    "duration": 1,
    "uploadbandwidth": 12582912,
    "downloadbandwidth": 12582912,
    "quota": 10737418240,
    "available": 1
  }
]
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
                uploadBandwidth: 0,
                downloadBandwidth: 0,
                quota: 0,
                new: true
            };
        }

		$scope.toString = function() {
			return 'PlanAdministration';
		}
	}])