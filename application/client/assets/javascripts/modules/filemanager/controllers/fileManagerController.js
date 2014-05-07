angular.module('FileManager').
	controller('FileManagerController', ['$scope', 'ItemFactory', 'UserFactory', 'FileExtensionFactory', 'AnnyangService', 'AnnyangFormatService', function($scope, ItemFactory, UserFactory, ExtensionFactory, AnnyangService, AnnyangFormatService) {
		var $local = $scope.FileManager = {};

        $local.draggedItem = null;

        $local.currentPath = '/';
		$local.folderOwner = -1;
		$local.previewActivated = false;
		$local.previewItem = null;

		$local.selectedItems = [];
		$local.items = [];

        $local.urlSharing = null;

		ItemFactory($scope, {local: $local}).load();

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
        });

		$local.createFolder = function(name, callback) {
            var options = {
                owner: UserFactory($scope).get().firstname + ' ' + UserFactory($scope).get().lastname,
                ownerId: UserFactory($scope).get().id,
                size : 0,
                type: 'folder',
                path: $local.currentPath,
                newItem: true,
                lastUpdate: new Date()
            }

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

            if(name)
                for(var i = 0; i<$local.items.length; i++)
                    if(AnnyangFormatService.baseFormat($local.items[i].name) == AnnyangFormatService.baseFormat(name))
                        items.push($local.items[i]);

            for(var i = 0; i<items.length; i++)
                ItemFactory($scope, {local: $local}).delete(items[i]);

            $local.preview(false);

		}

        $local.rename = function() {
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
            ItemFactory($scope, {local: $local}).load( $local.currentPath );
        };

        $local.preview = function(force) {
            $local.previewActivated = typeof force !== 'undefined' ? force : $local.selectedItems.length == 1;
        }

        $local.deleteItem = function(itemId) {
            $local.items.splice(itemId, 1);
        }

        $local.cancelPreview = function() {
            $local.previewActivated = false;
        }

        $local.shareFile = function() {
            if($local.selectedItems.length == 1 && $local.selectedItems[0].toString() == 'File') {
                ItemFactory($scope, {local: $local}).shareFile($local.selectedItems[0], function(error, token) {
                    if(!error && token) {
                        $local.urlSharing = window.location.origin + '/shared/' + token;
                        $local.selectedItems[0].shared = true;
                        $scope.$emit('enable_overlay');
                    } else
                        console.error(error);
                });
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