angular.module('FileManager').
	controller('FileManagerController', ['$scope', '$window', '$location', 'apiUrl', 'ItemFactory', 'UserFactory', 'SharingFactory', 'FileExtensionFactory', 'AnnyangService', 'AnnyangFormatService', 'WebsocketFactory', function($scope, $window, $location, apiUrl, ItemFactory, UserFactory, SharingFactory, ExtensionFactory, AnnyangService, AnnyangFormatService, WebsocketFactory) {
		var $local = $scope.FileManager = {};

        $local.draggedItem = null;

        $local.currentPath = '/';
		$local.folderOwner = -1;
		$local.previewActivated = false;
		$local.previewItem = null;
        $local.pathItems = [];


		$local.selectedItems = [];
		$local.items = [];

        $local.urlSharing = null;
        $local.folderSharing = false;

        if($location.$$absUrl.indexOf('/shared/') == -1) {
    		ItemFactory($scope, {local: $local}).load();
        }

        var socket = WebsocketFactory();
        socket.on('create_folder', function(data) {
            var lastItem = $local.pathItems[$local.pathItems.length-1].item
            ,   path = lastItem == data.path ? '' : data.fullPath.slice(0, data.fullPath.lastIndexOf('/'))
            , witness = false;
            if(lastItem == data.path || lastItem._id == path) {
                for(var i = 0; i<$local.items.length; i++)
                    if(parseInt(data.ownerId, 10) == parseInt($local.items[i].ownerId, 10) && $local.items[i].name == data.name) {
                        witness = true;
                        break;
                    }
                if(!witness)
                ItemFactory($scope, {local: $local}).add({
                    _id: data.fullPath,
                    name: data.name,
                    owner: UserFactory($scope).get().firstname + ' ' + UserFactory($scope).get().lastname,
                    ownerId: parseInt(data.ownerId,10),
                    creator: data.creatorName,
                    size : 0,
                    type: 'folder',
                    path: path + '/',
                    lastUpdate: new Date(),
                    unselectable: false,
                    todelete: false,
                    inupload: false
                }, function() { $scope.$apply(); })
            }
        })

        socket.on('create_file', function(data) {
            console.log('create file', data);
        })

        socket.on('delete', function(data) {
            console.log('delete',data);
        })
        socket.on('rename', function(data) {
            console.log('rename',data);
        })
        socket.on('copy', function(data) {
            console.log('copy',data);
        })


		$scope.$on('unselect_all', function() {
			$local.selectedItems = [];
			$scope.$broadcast('unselect');
		})

        $scope.$on('select_file', function(scope, file) {
            ExtensionFactory($scope).detection(file);
            $local.selectedItems.push(file);
            $local.previewActivated = true;
        })

        $scope.$on('hide', function() {
            $local.urlSharing = null;
            $local.folderSharing = false;
        });

		$local.createFolder = function(name, callback) {
            var options = {
                owner: UserFactory($scope).get().firstname + ' ' + UserFactory($scope).get().lastname,
                ownerId: $local.folderOwner,
                size : 0,
                type: 'folder',
                path: $local.currentPath,
                newItem: true,
                lastUpdate: new Date(),
                creator: UserFactory($scope).get().firstname + ' ' + UserFactory($scope).get().lastname
            }

            if($local.currentPath == '/Shared/')
                return true;

            options.name = name ? name : ''
            options.editMode = name ? false : true;

            if((name && !ItemFactory($scope, {local: $local}).checkNameExists(name, true)) || !name) {
                var item = ItemFactory($scope, {local: $local}).add(options, callback);

                if(name)
                    ItemFactory($scope, {local: $local}).createFolder(item);
            }
		};

		$local.delete = function(name) {
            var items = name ? [] : $local.selectedItems;

            if($local.currentPath == '/Shared/')
                return true;

            if(name)
                for(var i = 0; i<$local.items.length; i++)
                    if(AnnyangFormatService.baseFormat($local.items[i].name) == AnnyangFormatService.baseFormat(name))
                        items.push($local.items[i]);

            for(var i = 0; i<items.length; i++)
                ItemFactory($scope, {local: $local}).delete(items[i]);

            $local.preview(false);

		}

        $local.rename = function() {

            if($local.currentPath == '/Shared/')
                return true;

            var canceled = false;
            for(var i = 0; i < $local.selectedItems.length; i++)
                if($local.selectedItems[i].editMode) {
                    $scope.$broadcast('cancel_edit');
                    canceled = true;
                    break;
                }

            !canceled && $scope.$broadcast('rename_item');
        }

		$local.download = function() {
            if($local.selectedItems.length == 1 && $local.selectedItems[0].toString() == 'File')
                $local.selectedItems[0].download();
            else if($local.selectedItems.length > 0)
                $scope.$broadcast('start_post_download');
        };

        $local.refresh = function() {
            ItemFactory($scope, {local: $local}).load( $local.pathItems.length>1 ? $local.pathItems.pop().item : null );
            $local.preview(false);
        };

        $local.preview = function(force) {
            $local.previewActivated = typeof force !== 'undefined' ? force : $local.selectedItems.length == 1;

            if($local.previewActivated && $local.selectedItems && $local.selectedItems[0] && $local.selectedItems[0].category == 'folder') {
                SharingFactory($scope, {local: $local}).getSharedUsers($local.selectedItems[0]._id + '/', function(error, data) {
                    if(!error && data) {
                        $local.selectedItems[0].usersWebserviceSharing = [];
                        $local.selectedItems[0].usersActualSharing = [];
                        _.merge($local.selectedItems[0].usersWebserviceSharing, data);

                        for(var i = 0; i < $local.selectedItems[0].usersWebserviceSharing.length; i++)
                            if($local.selectedItems[0].usersWebserviceSharing[i].photo && $local.selectedItems[0].usersWebserviceSharing[i].photo != 'null')
                                $local.selectedItems[0].usersWebserviceSharing[i].photo = apiUrl + 'download/1/userPhotos/' + $local.selectedItems[0].usersWebserviceSharing[i].photo + '?token=' + UserFactory($scope).get().token + '&run';
                            else
                                $local.selectedItems[0].usersWebserviceSharing[i].photo = '';

                        _.merge($local.selectedItems[0].usersActualSharing, $local.selectedItems[0].usersWebserviceSharing);
                    } else {
                        $local.selectedItems[0].usersWebserviceSharing = [];
                        $local.selectedItems[0].usersActualSharing = [];
                    }
                    $local.selectedItems[0].usersToRemove = [];
                });
            }
        }

        $local.deleteItem = function(itemId) {
            $local.items.splice(itemId, 1);
        }

        $local.cancelPreview = function() {
            $local.previewActivated = false;
        }

        $local.shareItem = function() {
            if($local.selectedItems.length == 1 && $local.selectedItems[0].toString() == 'File') {
                ItemFactory($scope, {local: $local}).shareFile($local.selectedItems[0], function(error, token) {
                    if(!error && token) {
                        $local.urlSharing = $window.location.protocol + '//' + $window.location.host + '/shared/' + token;
                        $local.selectedItems[0].shared = true;
                        $scope.$emit('enable_overlay');
                    } else
                        console.error(error);
                });
            } else if($local.selectedItems.length == 1 && $local.selectedItems[0].toString() == 'Folder') {
                $scope.$broadcast('enable_overlay_sharing');
                $local.folderSharing = true;
                $scope.$emit('enable_overlay');
            }
        }

        $local.unshareFile = function() {
            if($local.selectedItems.length == 1 && $local.selectedItems[0].toString() == 'File') {
                ItemFactory($scope, {local: $local}).unshareFile($local.selectedItems[0], function(error, information) {
                    if(!error && information) {
                        $local.selectedItems[0].shared = false;
                    } else
                        console.error(error);
                });
            }
        }

        $local.renameVocal = function(oldName, newName) {
            if(!ItemFactory($scope, {local: $local}).checkNameExists(newName, true)) {
                var item = null
                for(var i = 0; i < $local.items.length; i++)
                    if(AnnyangFormatService.baseFormat($local.items[i].name) == AnnyangFormatService.baseFormat(oldName)) {
                        item = $local.items[i];
                        break;
                    }

                if(item) {
                    ItemFactory($scope, {local: $local}).rename(item.getFullPath(), newName);
                    item.name = newName;
                }
            }
        }

        $local.downloadVocal = function(name) {
            for(var i = 0; i < $local.items.length; i++)
                if(AnnyangFormatService.baseFormat($local.items[i].name) == AnnyangFormatService.baseFormat(name))
                    $local.selectedItems.push($local.items[i]);

            $scope.$apply();

            $local.download();
        }

        AnnyangService.set('open_item', function(name) {
            $scope.$broadcast('open_folder', name);
        });

        AnnyangService.set('open_parent_item', function() {
            $scope.$broadcast('open_parent_folder');
        });
        AnnyangService.set('open_parent_item_alternative', function() {
            $scope.$broadcast('open_parent_folder');
        });
        AnnyangService.set('open_parent_item_alternative2', function() {
            $scope.$broadcast('open_parent_folder');
        });

        AnnyangService.set('download_file', function(name) {
            $local.downloadVocal(name);
        });
        AnnyangService.set('download_file_alternative', function(name) {
            $local.downloadVocal(name);
        });
        AnnyangService.set('download_file_alternative2', function(name) {
            $local.downloadVocal(name);
        });

        AnnyangService.set('preview_file', function(name) {
            $scope.$broadcast('preview_item', name, function() { $scope.$apply(); });
        });

        AnnyangService.set('create_folder', function(name) {
            $local.createFolder(name, function() { $scope.$apply(); });
        });
        AnnyangService.set('create_folder_alternative', function(name) {
            $local.createFolder(name, function() { $scope.$apply(); });
        });
        AnnyangService.set('create_folder_alternative2', function(name) {
            $local.createFolder(name, function() { $scope.$apply(); });
        });
        AnnyangService.set('create_folder_alternative3', function(name) {
            $local.createFolder(name, function() { $scope.$apply(); });
        });

        AnnyangService.set('rename_item', function(oldName, newName) {
            $local.renameVocal(oldName, newName);
        });
        AnnyangService.set('rename_item_alternative', function(oldName, newName) {
            $local.renameVocal(oldName, newName);
        });
        AnnyangService.set('rename_item_alternative2', function(oldName, newName) {
            $local.renameVocal(oldName, newName);
        });
        AnnyangService.set('rename_item_alternative3', function(oldName, newName) {
            $local.renameVocal(oldName, newName);
        });

        AnnyangService.set('delete_item', function(name) {
            $local.delete(name);
        });

        AnnyangService.set('refresh', function(name) {
            $local.refresh();
        });

		$scope.toString = function() {
			return 'FileManager';
		}
	}])