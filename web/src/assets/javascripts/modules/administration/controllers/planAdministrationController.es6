angular.module('Administration').
	controller('PlanAdministrationController', ['$scope', 'PlanFactory', function($scope, PlanFactory) {
		var $local = $scope.PlanAdministration = {};
		$local.selectedPlan = {};
		$local.plans = [];
        $local.planImages = [];

        PlanFactory($scope).getAllPlans(function(error, plans) {
            $local.plans = plans;
        });

        PlanFactory($scope).getAllimages(function(error, images) {
            $local.planImages = [];
            if(!error)
            for(var i in images)
                $local.planImages.push({
                    style:{'background-image': 'url("' +  images[i].url + '")'},
                    name: images[i].name
                });
        })

        /**
         * select a plan
         * @param  {Object} plan Plan
         */
        $local.selectPlan = function(plan) {
            plan.selected = true;
            $local.selectedPlan = {
                id: plan.id,
                price: plan.price,
                name: plan.name,
                photoUrl: plan.photoUrl,
                style: {'background-image': 'url("' +  plan.photoUrl + '")'},
                description: plan.description,
                storage: plan.storage,
                photo: plan.photo,
                duration: plan.duration,
                downloadBandwidth: plan.downloadBandwidth,
                uploadBandwidth: plan.uploadBandwidth,
                quota: plan.quota
            };
        }

        /**
         * unselect a plan
         */
        $local.unselect = function() {
            $local.selectedPlan = {};
            for(var i = 0; i < $local.plans.length; i++) {
                $local.plans[i].selected = false;
                $local.plans[i].price = $local.plans[i].price / $local.plans[i].duration;
                $local.plans[i].duration = 1;
            }
        }

        /**
         * create a new plan
         */
        $local.createPlan = function() {
            $local.unselect();
            var photoName = ''
            ,   photoUrl = '';
            if($local.planImages[0]) {
                photoName = $local.planImages[0].name;
                photoUrl = $local.planImages[0].photoUrl;
            }
            $local.selectedPlan = {
                id: Math.round(Math.random()*1000000),
                price: 0,
                name: 'NEW',
                photo: photoName,
                photoUrl: photoUrl,
                description: 'DESCRIPTION',
                storage: 0,
                duration: 1,
                downloadBandwidth: 0,
                uploadBandwidth: 0,
                quota: 0,
                new: true
            };
        }

        /**
         * delete a plan
         * @param  {Object} $event Angular event
         * @param  {integer} index  index
         */
        $local.delete = function($event, index) {
            $event.stopPropagation();
            $event.preventDefault();
            PlanFactory($scope, {local: $local}).delete($local.plans[index].id, function() {
                PlanFactory($scope).getAllPlans(function(error, plans) {
                    $local.plans = plans;
                });
            });
        }

        /**
         * create or update the current plan in database
         * @param  {Boolean} isValid form validity
         */
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