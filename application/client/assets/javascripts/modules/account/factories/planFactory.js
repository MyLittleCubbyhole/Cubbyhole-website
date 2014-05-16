angular.module('Account').
    factory('PlanFactory', ['Restangular', 'UserFactory', function(restangular, userFactory){

        return function($scope, context) {
            context = context || {};

            if(!$scope)
                throw 'a scope must be defined ';

            var prototype = {};

            prototype.getActualPlan = function(callback) {
                restangular.one('users').one(userFactory($scope).get().id + '/plan').get().then(function(plan) {
                    var planToReturn = null;
                    if(plan && plan.id) {
                        planToReturn = {
                            id: plan.id,
                            price: plan.price,
                            name: plan.name,
                            storage: parseInt(plan.storage, 10),
                            duration: parseInt(plan.duration, 10),
                            uploadBandwidth: parseInt(plan.uploadbandwidth, 10),
                            downloadBandwidth: parseInt(plan.downloadbandwidth, 10),
                            quota: parseInt(plan.quota, 10),
                            available: plan.available,
                            dateStart: plan.datestart,
                            dateEnd: plan.dateend
                        };
                    }
                    callback.call(this, (planToReturn ? null : 'no current plan'), (planToReturn ? planToReturn : null));
                }, function(error) { callback.call(this, 'no current plan', null); console.error(error); });
            };

            prototype.getAllPlans = function(callback) {
                restangular.one('plans').getList().then(function(plans) {
                    var plansToReturn = [];
                    if(plans)
                        for(var i = 0; i < plans.length; i++)
                            plansToReturn.push({
                                id: plans[i].id,
                                price: plans[i].price,
                                name: plans[i].name,
                                storage: parseInt(plans[i].storage, 10),
                                duration: parseInt(plans[i].duration, 10),
                                uploadBandwidth: parseInt(plans[i].uploadbandwidth, 10),
                                downloadBandwidth: parseInt(plans[i].downloadbandwidth, 10),
                                quota: parseInt(plans[i].quota, 10),
                                available: plans[i].available
                            });
                    callback.call(this, (plansToReturn ? null : 'no plan found'), (plansToReturn ? plansToReturn : null));
                }, function(error) { callback.call(this, 'no plan found', null); console.error(error); });
            };

            return prototype;
        };
    }]);