angular.module('FileManager').
	controller('FileManagerController', ['$scope', 'ItemFactory', function($scope, ItemFactory) {
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
            ItemFactory($scope, {local: $local}).createFolder('new-folder');
		};

		$local.delete = function() {
			for(var i = 0; i<$local.selectedItems.length; i++)
				ItemFactory($scope, {local: $local}).delete($local.selectedItems[i].getFullPath());
            $local.preview(false);
		}

        $local.rename = function() {
            $scope.$broadcast('rename_item');
        }

		$local.download = function() {
			console.log($local.selectedItems[0].toString())
			if($local.selectedItems.length == 1 && $local.selectedItems[0].toString() == 'File')
				$local.selectedItems[0].download();
			else
				$scope.$broadcast('start_post_download');
		};

        $local.refresh = function() {
            ItemFactory($scope, {local: $local}).load( $local.currentPath );
        };

        $local.preview = function(force) {
            $local.previewActivated = typeof force !== 'undefined' ? force : $local.selectedItems.length == 1;
        }

		$scope.toString = function() {
			return 'FileManager';
		}
	}])