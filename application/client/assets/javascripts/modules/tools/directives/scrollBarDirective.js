angular.module('Tools').
	directive('scrollBar', function(){
		return {
			scope: true,
			restrict: 'A',
			link: function($scope, $node, attributes) {				
				$node.mCustomScrollbar();
			}
		};
	});