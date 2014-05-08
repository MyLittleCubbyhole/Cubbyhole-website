angular.module('Breadcrumb').
	controller('BreadcrumbController', ['$scope', 'ItemFactory', function($scope, ItemFactory){
		var $local = $scope.Breadcrumb = {};

		$local.path = ['/'];

		$scope.$watch('FileManager.currentPath', function() {
			$local.path = [];
			$local.path = $scope.FileManager.pathItems;//$scope.FileManager.currentPath.match(/([^/]*\/)/g);
		})

		$local.load = function(index) {
			// var fullPath = ''
			// ,	witness = false;
			// for(var i =0; i<=index; i++) {
			// 	//vire la partie shared dans le cas de dossier partagé afin d'utiliser les meme routes que dans un cas normal
			// 	if(index>1 && $local.path[i] == 'Shared/') {
			// 		witness = true;
			// 		continue;
			// 	}
			// 	fullPath += $local.path[i];
			// }
			var item = $local.path[index].item;
			// console.log(index, item, item.name)
			// console.log('before', $scope.FileManager.pathItems)
			// $scope.FileManager.pathItems.splice(0, index+1);
			
			for(var i =$scope.FileManager.pathItems.length; i>index; i--)
				$scope.FileManager.pathItems.pop();

			// console.log('after', $scope.FileManager.pathItems)
			$scope.FileManager.preview(false);
			// ItemFactory($scope, {local: $scope.FileManager}).load(fullPath, witness ? $scope.FileManager.folderOwner : null);
			ItemFactory($scope, {local: $scope.FileManager}).load(item);
		}

		$scope.toString = function() {
			return 'Breadcrumb';
		}
	}])