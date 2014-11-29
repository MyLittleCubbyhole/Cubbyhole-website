angular.module('Tools').
	directive('progressBar', ['$parse', function($parse){
		return {
			scope: true,
			restrict: 'E',
			replace: true,
			template: 	'<section class="progress-bar">'
					+	'<section class="value">{{_loadingBar.value | numeraljs:"0.00 b"}}</section>'
					+	'<section class="progress-bar-value"></section>'
					+	'</section>',
			link: function($scope, $node, attributes) {
				var $local = $scope._loadingBar = {};

				$local.value = $scope.FileManager.selectedItems[0].size;

				var total = $scope.Preview.totalSize
				,	percent = Math.round($local.value)*100 / Math.round(total)
				,	bgColor = attributes.bgColor || '#2c2c2c'
				,	barColor = attributes.bgColor || '#52d11a'
				,	color = attributes.color || '#474747';

				$node.css('background-color', bgColor);
				$node.find('.value').css('color', color);

				/**
				 * update the total size
				 */
				$scope.$watch('Preview.totalSize', function() {
					total = $scope.Preview.totalSize;
				});

				/**
				 * update the current value of the progress bar
				 */
				$scope.$watch('FileManager.selectedItems', function() {
					$local.value = $scope.FileManager.selectedItems[0].size;
					percent = Math.round($local.value)*100 / Math.round(total);
					$node.find('.progress-bar-value').css({
						'width': percent+'%',
						'background-color': barColor
					});
				});


				$scope.toString = function() {
					return '_loadingBar';
				};
			}
		};
	}]);