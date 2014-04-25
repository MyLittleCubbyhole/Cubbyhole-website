angular.module('FileManager').
	directive('item', ['ItemFactory', function(ItemFactory){
		return {
			scope: true,
			controller: function($scope) {
				var $local = $scope._item = {}
				,	self = this;

				$local.item = {};
				$local.oldName = "";
				$local.editMode = false;
				$local.selected = false;

				$scope.$on('unselect', function() {
					$local.selected = false;
				})

				$scope.$on('rename_item', function() {
					$local.rename();
				})

				$local.open = function(item) {
					if($local.item.category != 'folder')
						$local.download()
					else {
						$scope.FileManager.preview(false);
						ItemFactory($scope, {local: $scope.FileManager}).load($local.item.getFullPath());
					}
				};
				$local.move = function() { $local.item.move(); };

				$local.rename = function() {
					if($local.selected) {
						$scope.FileManager.cancelPreview();
						$local.editMode = true;
						$local.oldName = $local.item.name;
					}
				};

				$local.cancelEdit = function() {
					$local.editMode = false;
					$local.item.name = $local.oldName;
				};

				$local.validEdit = function() {
					$local.editMode = false;
					var newName = $local.item.name;
					$local.item.name = $local.oldName;
					var fullPath = $local.item.getFullPath();
					$local.item.name = newName;
					ItemFactory($scope, {local: $scope.FileManager}).rename(fullPath, $local.item.name);
				};

				$local.remove = function() { $local.item.remove(); };
				$local.select = function($event) {
					if($local.item.unselectable === true) 
						return true;

					$scope.FileManager.preview(false);

					var witness = $local.selected;
					if(!$event.ctrlKey)
						$scope.$emit('unselect_all');

					$local.selected = !witness;

					if($local.selected)
						$scope.FileManager.selectedItems.push($local.item);
					else
						for(var i = 0; i<$scope.FileManager.selectedItems.length; i++)
							if($scope.FileManager.selectedItems[i].name == $local.item.name) {
								$scope.FileManager.selectedItems.splice(i,1);
								break;
							}
				};
				$local.preview = function($event) {
					$local.select($event);
					if(!$local.editMode)
						$scope.FileManager.preview();
				}
				$local.download = function() {
					$local.item.download();
				}

				$scope.toString = function() {
					return '_item';
				}
			},
			require: 'item',
			restrict: 'A',
			link: function($scope, $node, attributes, self) {
				var $local = $scope._item;
				$local.item = ItemFactory($scope).get( attributes.itemId );
				$local.item.node = $node;
			}
		};
	}]);