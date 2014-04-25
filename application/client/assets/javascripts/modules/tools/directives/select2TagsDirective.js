angular.module('Tools').
	directive('select2Tags', function(){
		return {
			scope: true,
			restrict: 'A',
			link: function($scope, $node, attributes) {
				$node.select2({
					width: '350px',
					tags: []
				})
			}
		};
	});