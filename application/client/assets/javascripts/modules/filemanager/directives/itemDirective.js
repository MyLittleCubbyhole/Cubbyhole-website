angular.module('FileManager').
	directive('item', ['ItemFactory', function(ItemFactory){
		return {
			scope: true,
			controller: function($scope) {
				var $local = $scope._item = {}
				,	self = this;

				$local.item = {};
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
						$local.editMode = true;
					}
				};

				$local.remove = function() { $local.item.remove(); };
				$local.select = function($event) {
					$scope.FileManager.preview(false);

					var witness = $local.selected;
					if(!$event.ctrlKey)
						$scope.$emit('unselect_all');
					$local.selected = !witness;

					if($local.selected)
						$scope.FileManager.selectedItems.push($local.item);
					else
						dance:for(var i = 0; i<$scope.FileManager.selectedItems.length; i++) {
							if($scope.FileManager.selectedItems[i].name == $local.item.name) {
								$scope.FileManager.selectedItems.splice(i,1);
								break dance;
							}
						}
				};
				$local.preview = function($event) {
					$local.select($event);
					$scope.FileManager.preview();
				}
				$local.download = function() {
					$local.item.download();
				};

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