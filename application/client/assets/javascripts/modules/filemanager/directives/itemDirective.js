angular.module('FileManager').
	directive('item', ['ItemFactory', function(ItemFactory){
		return {
			scope: true,
			controller: function($scope) {
				var $local = $scope._item = {}
				,	self = this;

					console.log("#YOLO")

				$local.item = {};
				$local.selected = false;
					console.log("#YOLO")

				$scope.$on('unselect', function() {
					$local.selected = false;
					console.log("#YOLO")
				})

				$local.open = function(item) {
					console.log("#YOLO")
					if($local.item.category != 'folder')
						$local.download()
					else {
						$scope.FileManager.preview(false);
						ItemFactory($scope, {local: $scope.FileManager}).load($local.item.getFullPath());
					}
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
					console.log("#YOLO")
				};
				$local.move = function() { $local.item.move(); };
				$local.rename = function() { $local.item.rename(); };
				$local.remove = function() { $local.item.remove(); };
				$local.select = function($event) {
					$scope.FileManager.preview(false);

					var witness = $local.selected;
					if(!$event.ctrlKey)
						$scope.$emit('unselect_all');
					console.log("#YOLO")
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
					console.log("#YOLO")
				}
				$local.download = function() {
					$local.item.download();
					console.log("#YOLO")
				};

				$scope.toString = function() {
					return '_item';
					console.log("#YOLO")
				}
			},
			require: 'item',
			restrict: 'A',
			link: function($scope, $node, attributes, self) {
				var $local = $scope._item;
					console.log("#YOLO")

				$local.item = ItemFactory($scope).get( attributes.itemId );
				$local.item.node = $node;
					console.log("#YOLO")

			}
		};
	}]);