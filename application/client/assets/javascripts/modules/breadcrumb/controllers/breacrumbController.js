angular.module('Breadcrumb').
	controller('BreadcrumbController', ['$scope', 'ItemFactory', function($scope, ItemFactory){
		var $local = $scope.Breadcrumb = {};

		$local.path = ['/'];

		$scope.$watch('FileManager.currentPath', function() {
			$local.path = [];
			$local.path = $scope.FileManager.currentPath.match(/([^/]*\/)/g);
		})

		$local.load = function(index) {
			var fullPath = ''
			,	witness = false;
			for(var i =0; i<=index; i++) {
				//vire la partie shared dans le cas de dossier partagé afin d'utiliser les meme routes que dans un cas normal
				if(index>1 && $local.path[i] == 'Shared/') {
					witness = true;
					continue;
				}
				fullPath += $local.path[i];
			}

			$scope.FileManager.preview(false);
			ItemFactory($scope, {local: $scope.FileManager}).load(fullPath, witness ? $scope.FileManager.folderOwner : null);
		}

		$scope.toString = function() {
			return 'Breadcrumb';
		}
	}])