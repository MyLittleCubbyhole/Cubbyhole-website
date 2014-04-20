angular.module('Breadcrumb').
	controller('BreadcrumbController', ['$scope', 'ItemFactory', function($scope, ItemFactory){
		var $local = $scope.Breadcrumb = {};

		$local.path = ['/'];

		$scope.$watch('FileManager.currentPath', function() {
			$local.path = [];
			$local.path = $scope.FileManager.currentPath.match(/([^/]*\/)/g);
		})

		$local.load = function(index) {
			var fullPath = '';
			for(var i =0; i<=index; i++)
				fullPath += $local.path[i];

			$scope.FileManager.preview(false);
			ItemFactory($scope, {local: $scope.FileManager}).load(fullPath);
		}

		$scope.toString = function() {
			return 'Breadcrumb';
		}
	}])