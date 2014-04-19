angular.module('FileManager').
	controller('FileManagerController', ['$scope', 'ItemFactory', function($scope, ItemFactory) {
		var $local = $scope.FileManager = {};

		$local.currentPath = '/';

		$local.items = [];

		ItemFactory($scope, {local: $local}).load();

        $local.refresh = function() {
            ItemFactory($scope, {local: $local}).load( $local.currentPath );
        };

		$scope.toString = function() {
			return 'FileManager';
		}
	}])