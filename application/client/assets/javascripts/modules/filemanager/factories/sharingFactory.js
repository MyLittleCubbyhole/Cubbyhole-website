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
                restangular.one('users').one('shared').one(path).get().then(function(data) {
                    if(data && !data.information) {
                        var users = [];
                        for(var i = 0; i < data.length; i++)
                            users.push({
                                email: data[i].email,
                                right: data[i].right,
                                photo: data[i].photo
                            })
                        callback.call(this, null, users);
                    } else
                        callback.call(this, data.information, null)
                }, function(error) {
                    callback.call(this, 'no users found', null)
                    console.error(error);
                });
            }

            prototype.getByEmail = function(email, callback) {
                restangular.one('users').one(email).get().then(function(data) {
                    if(data && data.id)
                        callback.call(this, null, data)
                    else
                        callback.call(this, data.information, false)
                }, function(error) {
                    callback.call(this, data.information, false)
                    console.error(error);
                });
            }

            prototype.share = function(path, target, right, callback) {
                restangular.one('share').post(path, {'target': target, 'right': right}).then(function(data) {
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
                restangular.one('unshare').post(path, {'target': target}).then(function(data) {
                    if(data.information == 'folder unshared')
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