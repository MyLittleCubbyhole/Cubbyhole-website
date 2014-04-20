angular.module('FileManager').
	controller('FileManagerController', ['$scope', 'ItemFactory', function($scope, ItemFactory) {
		var $local = $scope.FileManager = {};

		$local.currentPath = '/';
		$local.previewActivated = false;

		$local.selectedItems = 0;
		$local.items = [];

		ItemFactory($scope, {local: $local}).load();

		$scope.$on('unselect_all', function() {
			$local.selectedItems = 0;
			$scope.$broadcast('unselect');
		})

        $local.refresh = function() {
            ItemFactory($scope, {local: $local}).load( $local.currentPath );
        };

        $local.preview = function() {
        	$local.previewActivated = $local.selectedItems == 1;
        }

		$scope.toString = function() {
			return 'FileManager';
		}
	}])