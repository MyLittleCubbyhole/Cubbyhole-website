angular.module('Breadcrumb').
	controller('BreadcrumbController', ['$scope', 'ItemFactory', function($scope, ItemFactory){
		var $local = $scope.Breadcrumb = {};

		$local.path = ['/'];

		$scope.$watch('FileManager.currentPath', function() {
			$local.path = [];
			$local.path = $scope.FileManager.pathItems;
		});

		/**
		 * update breadcrumb and load the folder
		 * @param  {integer} index item index
		 */
		$local.load = function(index) {
			var item = $local.path[index].item;
			
			for(var i =$scope.FileManager.pathItems.length; i>index; i--)
				$scope.FileManager.pathItems.pop();

			$scope.FileManager.preview(false);
			ItemFactory($scope, {local: $scope.FileManager}).load(item);
		};

		$scope.toString = function() {
			return 'Breadcrumb';
		};
	}]);