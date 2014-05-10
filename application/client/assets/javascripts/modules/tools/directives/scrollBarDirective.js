angular.module('Tools').
	directive('scrollBar', function(){
		return {
			scope: true,
			restrict: 'A',
			link: function($scope, $node, attributes) {				
				$node.mCustomScrollbar({  
					scrollEasing:"easeOutCirc",  
					mouseWheel:"auto",   
					autoDraggerLength:true,   
					advanced:{  
						updateOnBrowserResize:true,   
						updateOnContentResize:true   
					} // removed extra commas  
				});
			}
		};
	});