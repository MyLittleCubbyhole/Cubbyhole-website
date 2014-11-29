angular.module('Account').
    factory('DataChartFactory', ['Restangular', 'UserFactory', 'FormatSizeService', function(restangular, userFactory, FormatSizeService){

        return function($scope, context) {
            context = context || {};

            if(!$scope)
                throw 'a scope must be defined ';

            var prototype = {};

            /**
             * return the current used storage size
             * @param  {Function} callback 
             */
            prototype.getSizeUsed = function(callback) {
                restangular.one('browse').one(userFactory($scope).get().id + '/size').get().then(function(sizes) {
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
            };

            /**
             * return the current quota used
             * @param  {Function} callback 
             */
            prototype.getCurrentQuota = function(callback) {
                restangular.one('users').one(userFactory($scope).get().id + '/quota').get().then(function(quota) {
                    var quotaToReturn = null;
                    if(quota && quota.quotaUsed) {
                        quotaToReturn = {
                            day: quota.day,
                            quotaUsed: parseInt(quota.quotaUsed, 10)
                        };
                    }
                    callback.call(this, (quotaToReturn ? null : 'no current quota'), (quotaToReturn ? quotaToReturn : null));
                }, function(error) { callback.call(this, 'no current quota', null); console.error(error); });
            };

            return prototype;
        };
    }]);