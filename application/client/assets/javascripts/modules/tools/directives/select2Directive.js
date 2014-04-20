angular.module('Tools').
	directive('select2', function(){
		return {
			scope: true,
			restrict: 'A',
			link: function($scope, $node, attributes) {
				$node.select2({
					width: '250px',
    				minimumInputLength: 2
				})
			}
		};
	});