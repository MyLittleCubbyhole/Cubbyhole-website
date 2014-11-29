angular.module('FileManager').
    controller('SharingController', ['$scope', 'apiUrl', 'UserFactory', 'SharingFactory', function($scope, apiUrl, UserFactory, SharingFactory) {
        var $local = $scope.Sharing = {};

        $local.email = "";
        $local.shared = false;

        /**
         * LISTENER - hide the sharing modal
         */
        $scope.$on('hide', function() {
            if(!$local.shared && $scope.FileManager.selectedItems[0]) {
                $scope.FileManager.selectedItems[0].usersToRemove = [];
                $scope.FileManager.selectedItems[0].usersActualSharing = [];
                _.merge($scope.FileManager.selectedItems[0].usersActualSharing, $scope.FileManager.selectedItems[0].usersWebserviceSharing);
            }
        });

        /**
         * add a user to the sharing list
         * @param {Object} event Event
         */
        $local.addUser = function(event) {
            if((!event || event.keyCode == 13) && ($local.email !== undefined && $local.email !== '')) {
                var present = false;
                for(var i = 0; i < $scope.FileManager.selectedItems[0].usersActualSharing.length; i++)
                    if($scope.FileManager.selectedItems[0].usersActualSharing[i].email == $local.email)
                        present = true;

                if(!present)
                    SharingFactory($scope, {local: $local}).getByEmail($local.email, function(error, user) {
                        if(!error && user) {
                            var userData = {
                                email: $local.email,
                                right: 'R'
                            };
                            if(user.photo && user.photo != 'null')
                                userData.photo = apiUrl + 'download/1/userPhotos/' + user.photo + '?token=' + UserFactory($scope).get().token + '&run';
                            $scope.FileManager.selectedItems[0].usersActualSharing.push(userData);
                        }

                        $local.email = "";
                    });
                else
                    $local.email = "";
            }
        }

        /**
         * update the sharing of the selected item
         */
        $local.share = function() {
            if($scope.FileManager.selectedItems[0]) {
                var path = $scope.FileManager.selectedItems[0]._id + '/'
                ,   length = $scope.FileManager.selectedItems[0].usersToRemove.length;

                var callback = function() {
                    for(var i = 0; i < $scope.FileManager.selectedItems[0].usersActualSharing.length; i++) {
                        var updateOrCreate = true;
                        for(var j = 0; j < $scope.FileManager.selectedItems[0].usersWebserviceSharing.length; j++) {
                            if($scope.FileManager.selectedItems[0].usersActualSharing[i].email == $scope.FileManager.selectedItems[0].usersWebserviceSharing[j].email && $scope.FileManager.selectedItems[0].usersActualSharing[i].right == $scope.FileManager.selectedItems[0].usersWebserviceSharing[j].right)
                                updateOrCreate = false;
                        }

                        if(updateOrCreate)
                            SharingFactory($scope, {local: $local}).share(path, $scope.FileManager.selectedItems[0].usersActualSharing[i].email, $scope.FileManager.selectedItems[0].usersActualSharing[i].right, function(error, data) {
                                if(error && !data) {
                                    console.error(error);
                                    $scope.FileManager.addError('Folder not shared', error);
                                }
                                else
                                    $scope.FileManager.addInfo('Folder shared', 'Folder shared with ' + data.targetEmail);
                            })
                    }
                    $scope.FileManager.selectedItems[0].usersToRemove = [];
                    $scope.FileManager.selectedItems[0].usersWebserviceSharing = [];
                    _.merge($scope.FileManager.selectedItems[0].usersWebserviceSharing, $scope.FileManager.selectedItems[0].usersActualSharing);
                    $local.shared = true;
                }

                if(length>0)
                    for(var i = 0 ; i < $scope.FileManager.selectedItems[0].usersToRemove.length; i++) {
                        var userToRevove = $scope.FileManager.selectedItems[0].usersToRemove[i];
                        SharingFactory($scope, {local: $local}).unshare(path, userToRevove.email, function(error, data) {
                            if(error && !data) {
                                console.error(error);
                                $scope.FileManager.addError('Folder not unshared', error);
                            }
                            else
                                $scope.FileManager.addInfo('Folder unshared', 'Folder unshared with ' + data.targetEmail);

                            var index = $scope.FileManager.selectedItems[0].usersWebserviceSharing.indexOf(userToRevove);
                            if(index > -1)
                                $scope.FileManager.selectedItems[0].usersWebserviceSharing.slice(index, 1);
                            --length <= 0 && callback();
                        })
                    }
                else
                    callback();

            }
        }

        /**
         * remove a user from the current sharing item
         * @param  {Object} user User
         */
        $local.remove = function(user) {
            $scope.FileManager.selectedItems[0].usersToRemove.push(user);
            var index = $scope.FileManager.selectedItems[0].usersActualSharing.indexOf(user);
            if(index > -1)
                $scope.FileManager.selectedItems[0].usersActualSharing.splice(index, 1);
        }

        $scope.toString = function() {
            return 'Sharing';
        };
    }]);