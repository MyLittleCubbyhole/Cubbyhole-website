angular.module('FileManager').
    factory('SharingFactory', ['Restangular', function(restangular){

        return function($scope, context) {
            context = context || {};

            if(!$scope)
                throw 'a scope must be defined ';

            var prototype = {}
            ,   $node = context.node || {}
            ,   $local = context.local || {}
            ,   entity = context.entity || {}
            ,   controller = context.controller || {};

            var prototype = {};

            prototype.getSharedUsers = function(path, callback) {

            }

            prototype.checkUserExists = function(email, callback) {
                restangular.one('users').one(email).one('exists').get().then(function(data) {
                    if(data.information == 'user exists')
                        callback.call(this, null, true)
                    else
                        callback.call(this, data.information, false)
                }, function(error) {
                    callback.call(this, data.information, false)
                    console.error(error);
                });
            }

            prototype.share = function(path, target, right, callback) {
                restangular.one('share').one(path).post(path, {'target': target, 'right': right}).then(function(data) {
                    if(data.information == 'folder shared')
                        callback.call(this, null, data.params)
                    else
                        callback.call(this, data.information, null)
                }, function(error) {
                    callback.call(this, data.information, null)
                    console.error(error);
                });
            }

            prototype.unshare = function(path, target, callback) {
                restangular.one('unshare').one(path).post(path, {'target': target}).then(function(data) {
                    if(data.information == 'folder shared')
                        callback.call(this, null, data.params)
                    else
                        callback.call(this, data.information, null)
                }, function(error) {
                    callback.call(this, data.information, null)
                    console.error(error);
                });
            }

            return prototype;
        };
    }])