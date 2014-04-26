angular.module('FileManager').
	controller('FileManagerController', ['$scope', 'ItemFactory', 'UserFactory', function($scope, ItemFactory, UserFactory) {
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

		$local.createFolder = function() {
            ItemFactory($scope, {local: $scope.FileManager}).add({
                name: '',
                owner: UserFactory($scope).get().username,
                ownerId: UserFactory($scope).get().id,
                size : 0,
                type: 'folder',
                path: $local.currentPath,
                editMode: true,
                newItem: true,
                lastUpdate: new Date()
            });
		};

		$local.delete = function() {
			for(var i = 0; i<$local.selectedItems.length; i++)
                ItemFactory($scope, {local: $local}).delete($local.selectedItems[i]);
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

		$scope.toString = function() {
			return 'FileManager';
		}
	}])