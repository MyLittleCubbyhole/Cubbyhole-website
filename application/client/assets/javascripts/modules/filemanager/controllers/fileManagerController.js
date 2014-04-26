angular.module('FileManager').
	controller('FileManagerController', ['$scope', 'ItemFactory', 'UserFactory', 'AnnyangService', function($scope, ItemFactory, UserFactory, AnnyangService) {
		var $local = $scope.FileManager = {};

		$local.currentPath = '/';
		$local.previewActivated = false;
		$local.previewItem = null;

		$local.selectedItems = [];
		$local.items = [];

		ItemFactory($scope, {local: $local}).load();

		$scope.$on('unselect_all', function() {
			$local.selectedItems = [];
			$scope.$broadcast('unselect');
		})

		$local.createFolder = function(name, callback) {
            console.log(name);
            var options = {
                    owner: UserFactory($scope).get().username,
                    ownerId: UserFactory($scope).get().id,
                    size : 0,
                    type: 'folder',
                    path: $local.currentPath,
                    newItem: true,
                    lastUpdate: new Date()
                }

            if(name) {
                options.name = name;
                options.editMode = false;
                ItemFactory($scope, {local: $local}).createFolder(name);
            }
            else {
                options.name = '';
                options.editMode = true;
            }

            ItemFactory($scope, {local: $local}).add(options, callback);
		};

		$local.delete = function(name) {
            var items = name ? [] : $local.selectedItems;

            if(name)
                for(var i = 0; i<$local.items.length; i++)
                    if($local.items[i].name == name)
                        items.push($local.items[i]);

            console.log(items);

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

		$local.download = function() {};

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


        AnnyangService.set('create_folder', function(name) {
            $local.createFolder(name, function() { $scope.$apply(); });
        })

        AnnyangService.set('refresh', function(name) {
            $local.refresh();
        })

        AnnyangService.set('rename_item', function(name, name2) {

        })

        AnnyangService.set('delete_item', function(name) {
            $local.delete(name);
        })

        AnnyangService.set('open_item', function(name) {
            $scope.$broadcast('open_folder', name);
        })

        AnnyangService.start();


		$scope.toString = function() {
			return 'FileManager';
		}
	}])