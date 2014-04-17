angular.module('FileManager').
	directive('item', ['ItemFactory', function(ItemFactory){
		return { 
			scope: true,
			controller: function($scope) {
				var $local = $scope._item = {}
				,	self = this;


				$local.item = {};
				$local.selected = false;

				$local.open = function(path) { ItemFactory($scope).load(path) };
				$local.move = function() { $local.item.move(); };
				$local.rename = function() { $local.item.rename(); };
				$local.remove = function() { $local.item.remove(); };
				$local.preview = function() { $local.item.preview(); };
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