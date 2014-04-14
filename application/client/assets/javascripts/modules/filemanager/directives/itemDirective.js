angular.module('FileManager').
	directive('item', ['ItemFactory', function(ItemFactory){
		return { 
			scope: true,
			controller: function($scope) {
				var $local = $scope._item = {}
				,	self = this;


				$local.item = {};
				$local.selected = false;

				$local.move = function() { self.item.move(); };
				$local.rename = function() { self.item.rename(); };
				$local.remove = function() { self.item.remove(); };
				$local.preview = function() { self.item.preview(); };
				$local.download = function() { self.item.download(); };

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