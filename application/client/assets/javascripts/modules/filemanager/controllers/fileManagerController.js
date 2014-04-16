angular.module('FileManager').
	controller('FileManagerController', ['$scope', 'ItemFactory', function($scope, ItemFactory) {
		var $local = $scope.FileManager = {};

		$local.items = [];

		ItemFactory($scope, {local: $local}).load();

        $local.refresh = function() {
            ItemFactory($scope, {local: $local}).load();
        };

		$scope.toString = function() {
			return 'FileManager';
		}
	}])