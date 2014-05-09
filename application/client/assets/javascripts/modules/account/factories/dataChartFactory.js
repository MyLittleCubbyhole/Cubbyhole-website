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
                            storage: parseInt(plan.storage, 10),
                            duration: parseInt(plan.duration, 10),
                            uploadBandwidth: parseInt(plan.uploadbandwidth, 10),
                            downloadBandwidth: parseInt(plan.downloadbandwidth, 10),
                            quota: parseInt(plan.quota, 10),
                            available: plan.available,
                            dateStart: plan.datestart,
                            dateEnd: plan.dateend
                        }
                    }
                    callback.call(this, (planToReturn ? null : 'no current plan'), (planToReturn ? planToReturn : null));
                }, function(error) { callback.call(this, 'no current plan', null); console.error(error); });
            }

            prototype.getSizeUsed = function(callback) {
                restangular.one('browse').one(userFactory($scope).get().id + '/size').getList().then(function(sizes) {
                    var sizesToReturn = null;
                    if(sizes && sizes.length > 0) {
                        sizesToReturn = [];
                        for(var i = 0; i < sizes.length; i++) {
                            sizesToReturn.push({
                                _id: sizes[i]._id,
                                size: parseInt(sizes[i].size, 10)
                            });
                        }
                    }
                    callback.call(this, (sizesToReturn ? null : 'no sizes'), (sizesToReturn ? sizesToReturn : null));
                }, function(error) { callback.call(this, 'no sizes', null); console.error(error); });
            }

            prototype.getCurrentQuota = function(callback) {
                restangular.one('users').one(userFactory($scope).get().id + '/quota').get().then(function(quota) {
                    var quotaToReturn = null;
                    if(quota && quota.quotaused) {
                        quotaToReturn = {
                            day: quota.day,
                            quotaUsed: parseInt(quota.quotaused, 10)
                        }
                    }
                    callback.call(this, (quotaToReturn ? null : 'no current quota'), (quotaToReturn ? quotaToReturn : null));
                }, function(error) { callback.call(this, 'no current quota', null); console.error(error); });
            }

            return prototype;
        };
    }]);