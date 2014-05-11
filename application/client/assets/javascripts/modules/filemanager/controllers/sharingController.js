angular.module('FileManager').
    controller('SharingController', ['$scope', 'SharingFactory', function($scope, SharingFactory) {
        var $local = $scope.Sharing = {};

        $local.usersWebservice = [];
        $local.users = [];
        $local.usersToRemove = [];
        $local.email = "";

        $scope.$on('enable_overlay_sharing', function() {
            $local.loadUsers();
        })

        $local.loadUsers = function() {
            if($scope.FileManager.selectedItems[0]) {
                SharingFactory($scope, {local: $local}).getSharedUsers($scope.FileManager.selectedItems[0]._id + '/', function(error, data) {
                    if(!error && data) {
                        _.merge($local.usersWebservice, data);
                        _.merge($local.users, data);
                    }
                })
            }
        }

        $local.addUser = function(event) {
            if(event.keyCode == 13 && $local.email !== undefined && $local.email !== '') {
                SharingFactory($scope, {local: $local}).checkUserExists($local.email, function(error, exists) {
                    if(!error && exists)
                        $local.users.push({
                            email: $local.email,
                            right: 'R'
                        })

                    $local.email = "";
                });
            }
        }

        $local.share = function() {
            if($scope.FileManager.selectedItems[0]) {
                var path = $scope.FileManager.selectedItems[0]._id + '/'
                ,   length = $local.usersToRemove.length;

                var callback = function() {
                    for(var i = 0; i < $local.users.length; i++) {
                        var updateOrCreate = true;
                        for(var j = 0; j < $local.usersWebservice.length; j++) {
                            if($local.users[i].email == $local.usersWebservice[j].email && $local.users[i].right == $local.usersWebservice[j].right)
                                updateOrCreate = false;
                        }

                        if(updateOrCreate)
                            SharingFactory($scope, {local: $local}).share(path, $local.users[i].email, $local.users[i].right, function(error, data) {
                                if(error && !data)
                                    console.error(error);
                            })
                    }
                }

                if(length>0)
                    for(var i = 0 ; i < $local.usersToRemove.length; i++) {
                        var userToRevove = $local.usersToRemove[i];
                        SharingFactory($scope, {local: $local}).unshare(path, userToRevove.email, function(error, data) {
                            if(error && !data)
                                console.error(error);
                            var index = $local.usersWebservice.indexOf(userToRevove);
                            if(index > -1)
                                $local.usersWebservice.slice(index, 1);
                            --length <= 0 && callback();
                        })
                    }
                else
                    callback();

            }
        }

        $local.remove = function(user) {
            $local.usersToRemove.push(user);
            var index = $local.users.indexOf(user);
            if(index > -1)
                $local.users.splice(index, 1);
        }

        $scope.toString = function() {
            return 'Sharing';
        };
    }]);