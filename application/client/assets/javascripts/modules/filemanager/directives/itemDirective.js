angular.module('FileManager').
	directive('item', ['ItemFactory', function(ItemFactory){
		return {
			scope: true,
			controller: function($scope) {
				var $local = $scope._item = {}
				,	self = this;


				$local.item = {};
				$local.selected = false;

				$scope.$on('unselect', function() {
					$local.selected = false;
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
				$local.rename = function() { $local.item.rename(); };
				$local.remove = function() { $local.item.remove(); };
				$local.select = function($event) {
					if(!$event.ctrlKey)
						$scope.$emit('unselect_all');

					$local.selected = !$local.selected;

					if($local.selected)
						$scope.FileManager.selectedItems.push($local.item);
					else
						$scope.FileManager.selectedItems = _.without($scope.FileManager.selectedItems, $local.item);

					$scope.FileManager.preview();

				};
				$local.download = function() { $local.item.download(); };

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