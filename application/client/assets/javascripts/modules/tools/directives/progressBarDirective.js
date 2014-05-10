angular.module('Tools').
	directive('progressBar', function(){
		return {
			scope: true,
			restrict: 'E',
			replace: true,
			template: 	'<section class="progress-bar">'
					+	'<section class="value">{{_loadingBar.value | ItemSizeFilter}}</section>'
					+	'<section class="progress-bar-value"></section>'
					+	'</section>',
			link: function($scope, $node, attributes) {
				var $local = $scope._loadingBar = {};

				$local.value = parseFloat( (attributes.value || 0) );

				var total = parseFloat( (attributes.total || 0) )
				,	percent = Math.round($local.value)*100 / Math.round(total)
				,	bgColor = attributes.bgColor || '#2c2c2c'
				,	barColor = attributes.bgColor || '#52d11a'
				,	color = attributes.color || '#474747';

				$node.css('background-color', bgColor);
				$node.find('.value').css('color', color);
				$node.find('.progress-bar-value').css({
					'width': percent+'%',
					'background-color': barColor
				});

				$scope.toString = function() {
					return '_loadingBar';
				}
			}
		};
	});