var toto;
angular.module('FileManager').
	controller('FileManagerController', ['$scope', '$window', '$location', 'FileProvider', 'FolderProvider', 'apiUrl', 'ItemFactory', 'UserFactory', 'SharingFactory', 'FileExtensionFactory', 'AnnyangService', 'AnnyangFormatService', 'WebsocketFactory', 'HarlemService', function($scope, $window, $location, File, Folder, apiUrl, ItemFactory, UserFactory, SharingFactory, ExtensionFactory, AnnyangService, AnnyangFormatService, WebsocketFactory, HarlemService) {
		var $local = $scope.FileManager = {};

        $local.draggedItem = null;

        $local.user = {};

        /**
         * LISTNER - update the local user when a new user is loaded
         */
        $scope.$watch(UserFactory($scope).get(), function() {
            $local.user = UserFactory($scope).get();
        });

        $local.currentPath = '/';
		$local.folderOwner = -1;
		$local.previewActivated = false;
		$local.previewItem = null;
        $local.pathItems = [];

        /**
         * OVERRIDE BY THE BOXALERT DIRECTIVE
         */
        $local.alert = function() { /*overriden by boxalert directive*/ }

        /**
         * call the alert method in order to create an info alert
         * @param {string} title
         * @param {string} subtitle
         */
        $local.addInfo = function(title, subtitle) {
            $local.alert({
                type: 'info',
                title: title,
                subtitle: subtitle
            });
        };

        /**
         * call the alert method in order to create an error alert
         * @param {string} title
         * @param {string} subtitle
         */
        $local.addError = function(title, subtitle) {
            $local.alert({
                type: 'error',
                title: title,
                subtitle: subtitle
            });
        };

        $local.itemsToCopy = [];

		$local.selectedItems = [];
		$local.items = [];

        $local.urlSharing = null;
        $local.folderSharing = false;

        if($location.$$absUrl.indexOf('/shared/') == -1) {
    		ItemFactory($scope, {local: $local}).load();
        }

        var socket = WebsocketFactory();

        /**
         * LISTENER - create an item when a new folder is created by someone in the current directory
         * @param  {Object} data folder information
         */
        socket.on('create_folder', function(data) {
            var lastItem = $local.pathItems[$local.pathItems.length-1].item
            ,   path = lastItem == data.path ? '' : data.fullPath.slice(0, data.fullPath.lastIndexOf('/'))
            ,   witness = false;

            $local.addInfo('Folder created', 'The folder ' + data.name + ' has been created');
            $scope.$apply();

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
                        path: path.substring(path.indexOf('/')) + '/',
                        lastUpdate: new Date(),
                        unselectable: false,
                        todelete: false,
                        inupload: false
                    }, function() { $scope.$apply(); });
            }
        });

        /**
         * LISTENER - create an item when a new file is created by someone in the current directory
         * @param  {Object} data file information
         */
        socket.on('create_file', function(data) {
            var lastItem = $local.pathItems[$local.pathItems.length-1].item
            ,   path = lastItem == data.logicPath ? '' : data.fullPath.slice(0, data.fullPath.lastIndexOf('/'))
            ,   witness = false;

            $local.addInfo('File created', 'The file ' + data.name + ' has been created');
            $scope.$apply();

            if(lastItem == data.logicPath || lastItem._id == path) {
                for(var i = 0; i<$local.items.length; i++)
                    if(parseInt(data.owner, 10) == parseInt($local.items[i].ownerId, 10) && $local.items[i].name == data.name) {
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
                        size : data.size,
                        type: 'file',
                        path: path.substring(path.indexOf('/')) + '/',
                        lastUpdate: new Date(),
                        unselectable: false,
                        todelete: false,
                        inupload: false
                    }, function() { $scope.$apply(); });
            }
        });

        /**
         * LISTENER - delete an item when someone delete it in the current directory
         * @param  {Object} data item information
         */
        socket.on('delete', function(data) {
            $local.addInfo('Item deleted', 'The item ' + data.fullPath.substring(data.fullPath.lastIndexOf('/') + 1) + ' has been deleted');
            ItemFactory($scope, {local: $local}).clean(data.fullPath);
            $scope.$apply();
        });

        /**
         * LISTENER - rename an item when someone rename it
         * @param  {Object} data item information
         */
        socket.on('rename', function(data) {
            $local.addInfo('Item renamed', 'The item ' + data.currentName + ' has been renamed');
            $scope.$apply();

            var items = ItemFactory($scope, {local: $local}).getAll();
            for(var i=0; i<items.length; i++)
                if(items[i]._id == data.fullPath) {
                    items[i]._id = items[i]._id.substring(0, items[i]._id.lastIndexOf('/') + 1) + data.newName;
                    items[i].name = data.newName;
                    ItemFactory($scope, {local: $local}).synchronize();
                    break;
                }

            $scope.$apply();
        });

        /**
         * LISTENER - create an alert when someont copy/paste an item
         * remove the source and create the item into the new position
         * @param  {Object} data item information
         */
        socket.on('copy', function(data) {
            var lastItem = $local.pathItems[$local.pathItems.length-1].item
            ,   path = lastItem == data.targetPath ? '' : data.fullPath.slice(0, data.fullPath.lastIndexOf('/'))
            ,   witness = false;

            $local.addInfo('Item ' + (data.move ? 'moved' : 'copied'), 'The item ' + data.newName + ' has been ' + (data.move ? 'moved' : 'copied'));
            $scope.$apply();

            if(lastItem == data.targetPath || lastItem._id == path) {
                for(var i = 0; i<$local.items.length; i++)
                    if(data.fullPath == $local.items[i]._id) {
                        witness = true;
                        break;
                    }
                if(!witness)
                    ItemFactory($scope, {local: $local}).add({
                        _id: data.fullPath,
                        name: data.newName,
                        owner: UserFactory($scope).get().firstname + ' ' + UserFactory($scope).get().lastname,
                        ownerId: parseInt(data.ownerId,10),
                        creator: data.creator,
                        size : data.size,
                        type: data.type,
                        path: path.substring(path.indexOf('/')) + '/',
                        lastUpdate: new Date(),
                        unselectable: false,
                        todelete: false,
                        inupload: false
                    }, function() { $scope.$apply(); });
            }
            if(data.move) {
                ItemFactory($scope, {local: $local}).clean(data.baseFullPath);
                $scope.$apply();
            }
        });

        /**
         * LISTENER - call all items and unselect them
         */
		$scope.$on('unselect_all', function() {
			$local.selectedItems = [];
			$scope.$broadcast('unselect');
		});

        /**
         * LISTENER - add the selected file to the selected item array
         * active the preview
         * @param  {Object} scope Angular scope
         * @param  {Object} file  file informations
         */
        $scope.$on('select_file', function(scope, file) {
            ExtensionFactory($scope).detection(file);
            $local.selectedItems.push(file);
            $local.previewActivated = true;
        });

        /**
         * LISTENER - hide the sharing modal when called
         */
        $scope.$on('hide', function() {
            $local.urlSharing = null;
            $local.folderSharing = false;
        });

        /**
         * create a new folder
         * @param  {string}   name     folder name
         * @param  {Function} callback
         */
		$local.createFolder = function(name, callback) {
            var options = {
                owner: UserFactory($scope).get().firstname + ' ' + UserFactory($scope).get().lastname,
                ownerId: $local.folderOwner,
                creatorId: UserFactory($scope).get().id,
                size : 0,
                type: 'folder',
                path: $local.currentPath,
                newItem: true,
                lastUpdate: new Date(),
                creator: UserFactory($scope).get().firstname + ' ' + UserFactory($scope).get().lastname
            };

            if($local.currentPath === '/Shared/') {
                $local.addError('Folder not created', 'You can\'t create a folder into the Shared folder');
                return true;
            }

            options.name = name ? name : '';
            options.editMode = name ? false : true;

            if((name && !ItemFactory($scope, {local: $local}).checkNameExists(name, true)) || !name) {
                var item = ItemFactory($scope, {local: $local}).add(options, callback);

                if(name)
                    ItemFactory($scope, {local: $local}).createFolder(item);
            }
		};

        /**
         * delete an item from the current directory
         * @param  {string} name
         */
		$local.delete = function(name) {
            var items = name ? [] : $local.selectedItems;

            if($local.currentPath === '/Shared/') {
                $local.addError('Folder not deleted', 'You can\'t delete a shared folder');
                return true;
            }

            if(name)
                for(var i = 0; i<$local.items.length; i++)
                    if(AnnyangFormatService.removeExtension(AnnyangFormatService.baseFormat($local.items[i].name)) == AnnyangFormatService.baseFormat(name))
                        items.push($local.items[i]);

            for(var i = 0; i<items.length; i++)
                ItemFactory($scope, {local: $local}).delete(items[i]);

            $local.preview(false);

		};

        /**
         * rename an item
         */
        $local.rename = function() {

            if($local.currentPath === '/Shared/') {
                $local.addError('Item not renamed', 'You can\'t rename an item into the Shared folder');
                return true;
            }

            var canceled = false;
            for(var i = 0; i < $local.selectedItems.length; i++)
                if($local.selectedItems[i].editMode) {
                    $scope.$broadcast('cancel_edit');
                    canceled = true;
                    break;
                }

            !canceled && $scope.$broadcast('rename_item');
        };

        /**
         * download an item
         */
		$local.download = function() {
            if($local.selectedItems.length === 1 && $local.selectedItems[0].toString() === 'File')
                $local.selectedItems[0].download();
            else if($local.selectedItems.length > 0)
                $scope.$broadcast('start_post_download');
        };

        /**
         * refresh the current directory
         */
        $local.refresh = function() {
            ItemFactory($scope, {local: $local}).load( $local.pathItems.length>1 ? $local.pathItems.pop().item : null );
            $local.preview(false);
        };

        /**
         * copy the selected items
         */
        $local.copy = function() {
            if($local.selectedItems.length >= 1) {
                $local.itemsToCopy.slice(0);
                $local.itemsToCopy = [];
                $local.itemsToCopy = $local.selectedItems;
                if($local.selectedItems.length === 1)
                    $local.addInfo($local.itemsToCopy[0].options.type[0].toUpperCase() + $local.itemsToCopy[0].options.type.slice(1) + ' copied', 'The ' + $local.itemsToCopy[0].options.type + ' ' + $local.itemsToCopy[0].name + ' has been copied');
                else
                    $local.addInfo('Items copied', 'Some items have been copied');
            }
        };

        /**
         * paste the copied item
         */
        $local.paste = function() {

            if($local.currentPath === '/Shared/') {
                $local.addError('Items not copied', 'You can\'t paste items into the Shared folder');
                return true;
            }

            var lastItem = $local.pathItems[$local.pathItems.length-1].item;

            if($local.itemsToCopy.length >= 1) {
                for(var i = 0; i < $local.itemsToCopy.length; i++) {
                    var newItem = null;
                    if($local.itemsToCopy[i].toString() === 'Folder')
                        newItem = new Folder($local.itemsToCopy[i].options);
                    else
                        newItem = new File($local.itemsToCopy[i].options);

                    if(lastItem !== '/') {
                        newItem.path = lastItem._id.substring(lastItem._id.indexOf('/')) + '/';
                        newItem.ownerId = lastItem.ownerId;
                    }
                    else {
                        newItem.path = lastItem;
                        newItem.ownerId = UserFactory($scope).get().id;
                    }

                    ItemFactory($scope, {local: $local}).copy($local.itemsToCopy[i], newItem);
                }
                $local.itemsToCopy.slice(0);
                $local.itemsToCopy = [];
            }
        };

        /**
         * active the preview item
         * @param  {Boolean} force force the preview activation
         */
        $local.preview = function(force) {
            $local.previewActivated = typeof force !== 'undefined' ? force : $local.selectedItems.length === 1;

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
        };

        /**
         * delete an item from the items array
         * @param  {integer} itemId item id
         */
        $local.deleteItem = function(itemId) {
            $local.items.splice(itemId, 1);
        };

        /**
         * disable the preview
         */
        $local.cancelPreview = function() {
            $local.previewActivated = false;
        };

        /**
         * share an item
         * case file: create a public link
         * case folder: share to the selected users the selected folder
         */
        $local.shareItem = function() {
            if($local.selectedItems.length === 1 && $local.selectedItems[0].toString() === 'File') {
                ItemFactory($scope, {local: $local}).shareFile($local.selectedItems[0], function(error, token) {
                    if(!error && token) {
                        $local.urlSharing = $window.location.protocol + '//' + $window.location.host + '/shared/' + token;
                        $local.selectedItems[0].shared = true;
                        $scope.$emit('enable_overlay');
                    } else
                        console.error(error);
                });
            } else if($local.selectedItems.length === 1 && $local.selectedItems[0].toString() === 'Folder') {
                $scope.$broadcast('enable_overlay_sharing');
                $local.folderSharing = true;
                $scope.$emit('enable_overlay');
            }
        };

        /**
         * unshare a public file
         */
        $local.unshareFile = function() {
            if($local.selectedItems.length === 1 && $local.selectedItems[0].toString() === 'File') {
                ItemFactory($scope, {local: $local}).unshareFile($local.selectedItems[0], function(error, information) {
                    if(!error && information) {
                        $local.selectedItems[0].shared = false;
                        $local.addInfo('File unshared', 'The file ' + $local.selectedItems[0].name + ' has been unshared');
                    } else {
                        console.error(error);
                        $local.addError('File unshared', 'The file has not been unshared');
                    }
                });
            }
        };

        /**
         * VOCAL - rename callback
         * @param  {string} oldName
         * @param  {string} newName
         * @param  {Boolean} like
         */
        $local.renameVocal = function(oldName, newName, like) {
            if(!ItemFactory($scope, {local: $local}).checkNameExists(newName, true)) {
                var item = null;
                for(var i = 0; i < $local.items.length; i++)
                    if((!like && AnnyangFormatService.removeExtension(AnnyangFormatService.baseFormat($local.items[i].name)) == AnnyangFormatService.baseFormat(oldName)) || (like && AnnyangFormatService.removeExtension(AnnyangFormatService.baseFormat($local.items[i].name)).indexOf(AnnyangFormatService.baseFormat(oldName)) > -1)) {
                        item = $local.items[i];
                        break;
                    }

                if(item) {
                    var extension = (/(?:\.([^.]+))?$/).exec(item.name)[1];
                    extension = extension || '';
                    var name = extension === '' ? newName : newName + '.' + extension;
                    ItemFactory($scope, {local: $local}).rename(item.ownerId.toString() + item.getFullPath(), name);
                    item.name = name;
                }
            }
        };

        /**
         * VOCAL - download callback
         * @param  {string} name
         * @param  {Boolean} like
         */
        $local.downloadVocal = function(name, like) {
            var found = false;
            for(var i = 0; i < $local.items.length; i++)
                if((!like && AnnyangFormatService.removeExtension(AnnyangFormatService.baseFormat($local.items[i].name)) == AnnyangFormatService.baseFormat(name)) || (like && name != '' && AnnyangFormatService.removeExtension(AnnyangFormatService.baseFormat($local.items[i].name)).indexOf(AnnyangFormatService.baseFormat(name)) > -1)) {
                    $local.selectedItems.push($local.items[i]);
                    found = true;
                }

            $scope.$apply();
            $local.download();

            if(found) {
                $local.selectedItems = [];
                $scope.$apply();
            }
        };

        /**
         * VOCAL - set the open folder like method
         * @param  {string} name
         */
        AnnyangService.set('open_folder_like', function(name) {
            $scope.$broadcast('open_folder', name, true);
        });

        /**
         * VOCAL - set the open folder method
         * @param  {string} name
         */
        AnnyangService.set('open_folder', function(name) {
            $scope.$broadcast('open_folder', name);
        });

        /**
         * VOCAL - set an alternative open folder method
         * @param  {string} name
         */
        AnnyangService.set('open_folder_alternative', function(name) {
            $scope.$broadcast('open_folder', name);
        });

        /**
         * VOCAL - set the open parent folder method
         */
        AnnyangService.set('open_parent_folder', function() {
            $scope.$broadcast('open_parent_folder');
        });

        /**
         * VOCAL - set an alternative of the open parent folder method
         */
        AnnyangService.set('open_parent_folder_alternative', function() {
            $scope.$broadcast('open_parent_folder');
        });

        /**
         * VOCAL - set the download file like method
         * @param  {string} name
         */
        AnnyangService.set('download_file_like', function(name) {
            $local.downloadVocal(name, true, true);
        });

        /**
         * VOCAL - set the download file method
         * @param  {string} name
         */
        AnnyangService.set('download_file', function(name) {
            $local.downloadVocal(name, true);
        });

        /**
         * VOCAL - set the preview item like method
         * @param  {string} name
         */
        AnnyangService.set('preview_item_like', function(name) {
            $scope.$broadcast('preview_item', name, true, function() { $scope.$apply(); });
        });

        /**
         * VOCAL - set the preview item method
         * @param  {string} name
         */
        AnnyangService.set('preview_item', function(name) {
            $scope.$broadcast('preview_item', name, false, function() { $scope.$apply(); });
        });

        /**
         * VOCAL - set the select file like method
         * @param  {string} name
         */
        AnnyangService.set('select_file_like', function(name) {
             $scope.$broadcast('select_item', name, true, function() { $scope.$apply(); });
        });

        /**
         * VOCAL - set the select all method
         * @param  {string} name
         */
        AnnyangService.set('select_all', function(name) {
             $scope.$broadcast('select', function() { $scope.$apply(); });
        });

        /**
         * VOCAL - set the select file method
         * @param  {string} name
         */
        AnnyangService.set('select_file', function(name) {
             $scope.$broadcast('select_item', name, false, function() { $scope.$apply(); });
        });

        /**
         * VOCAL - set the unselect file like method
         * @param  {string} name
         */
        AnnyangService.set('unselect_file_like', function(name) {
             $scope.$broadcast('unselect_item', name, true, function() { $scope.$apply(); });
        });

        /**
         * VOCAL - set the unselect all method
         */
        AnnyangService.set('unselect_all', function() {
            $scope.$broadcast('unselect', function() { $scope.$apply(); });
        });

        /**
         * VOCAL - set the unselect file method
         * @param  {string} name
         */
        AnnyangService.set('unselect_file', function(name) {
             $scope.$broadcast('unselect_item', name, false, function() { $scope.$apply(); });
        });

        /**
         * VOCAL - set the create folder method
         * @param  {string} name
         */
        AnnyangService.set('create_folder', function(name) {
            $local.createFolder(name, function() { $scope.$apply(); });
        });

        /**
         * VOCAL - set the delete item method
         * @param  {string} name
         */
        AnnyangService.set('delete_item', function(name) {
            $local.delete(name);
        });

        /**
         * VOCAL - set the rename item like mthod
         * @param  {string} oldName
         * @param  {string} newName
         */
        AnnyangService.set('rename_item_like', function(oldName, newName) {
            $local.renameVocal(oldName, newName, true);
        });

        /**
         * VOCAL - set the rename method
         * @param  {string} oldName
         * @param  {string} newName
         */
        AnnyangService.set('rename_item', function(oldName, newName) {
            $local.renameVocal(oldName, newName);
        });

        /**
         * VOCAL - set the copy method
         * @param  {string} oldName
         * @param  {string} newName
         */
        AnnyangService.set('copy', function(oldName, newName) {
            $local.copy();
            $local.selectedItems = [];
            $scope.$apply();
        });

        /**
         * VOCAL - set the paste method
         * @param  {string} oldName
         * @param  {string} newName
         */
        AnnyangService.set('paste', function(oldName, newName) {
            $local.paste();
        });

        /**
         * VOCAL - set the refresh method
         * @param  {string} name
         */
        AnnyangService.set('refresh', function(name) {
            $local.refresh();
        });

        /**
         * VOCAL - set the harlem shake full method
         * @param  {string} name
         */
        AnnyangService.set('harlem_shake_full', function(name) {
            HarlemService.doFull();
            setTimeout(function(){
                HarlemService.stop();
            }, 15000);
        });

        /**
         * VOCAL - set an alternative of the harlem shake full method
         * @param  {string} name
         */
        AnnyangService.set('harlem_shake_full_alternative', function(name) {
            HarlemService.doFull();
            setTimeout(function(){
                HarlemService.stop();
            }, 15000);
        });

        /**
         * VOCAL - set the harlem shake first method
         * @param  {string} name
         */
        AnnyangService.set('harlem_shake_first', function(name) {
            HarlemService.doFirst();
        });

        /**
         * VOCAL - sert an alternative of the harlem shake first method
         * @param  {string} name
         */
        AnnyangService.set('harlem_shake_first_alternative', function(name) {
            HarlemService.doFirst();
        });

		$scope.toString = function() {
			return 'FileManager';
		};
	}]);