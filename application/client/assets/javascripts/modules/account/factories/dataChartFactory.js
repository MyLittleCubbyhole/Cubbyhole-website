angular.module('Account').
    factory('DataChartFactory', ['Restangular', 'UserFactory', 'FormatSizeService', function(restangular, userFactory, FormatSizeService){

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
                            storage: plan.storage,
                            duration: plan.duration,
                            uploadBandwidth: plan.uploadbandwidth,
                            downloadBandwidth: plan.downloadbandwidth,
                            quota: plan.quota,
                            available: plan.available,
                            dateStart: plan.datestart,
                            dateEnd: plan.dateend
                        }
                    }
                    callback.call(this, (planToReturn ? null : 'no current plan'), (planToReturn ? planToReturn : null));
                }, function(error) { callback.call(this, 'no current plan', null); console.error(error); });
            }

            prototype.getSizeUsed = function(callback) {

            }

            prototype.getCurrentQuota = function(callback) {
                restangular.one('users').one(userFactory($scope).get().id + '/quota').get().then(function(quota) {
                    var quotaToReturn = null;
                    if(quota && quota.quotaused) {
                        quotaToReturn = {
                            day: quota.day,
                            quotaUsed: quota.quotaused
                        }
                    }
                    callback.call(this, (quotaToReturn ? null : 'no current quota'), (quotaToReturn ? quotaToReturn : null));
                }, function(error) { callback.call(this, 'no current quota', null); console.error(error); });
            }

            return prototype;
        };
    }]);