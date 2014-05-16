angular.module('Tools').
	directive('progressBarPlan', ['$parse', function($parse){
		return {
			scope: true,
			restrict: 'E',
			replace: true,
			template: 	'<section class="progress-bar">'
					+	'<section class="value">{{_loadingBar.value}}</section>'
					+	'<section class="progress-bar-value"></section>'
					+	'</section>',
			link: function($scope, $node, attributes) {
				var $local = $scope._loadingBar = {};

				var dateStart = new Date($scope.Account.currentPlan.dateStart).getTime();
				var dateEnd = new Date($scope.Account.currentPlan.dateEnd).getTime();

				var total = dateEnd - dateStart
				,	remaining = dateEnd - new Date().getTime()
				,	percent = Math.round(remaining)*100 / Math.round(total)
				,	bgColor = attributes.bgColor || '#2c2c2c'
				,	barColor = attributes.bgColor || '#52d11a'
				,	color = attributes.color || '#474747';

				var date = new Date(remaining);
				$local.value = '';
				if(date.getDate() - 1)
					$local.value += (date.getDate() - 1) + 'D - ';
				$local.value += new Date(remaining).getHours() + 'h'

				$node.css('background-color', bgColor);
				$node.find('.value').css('color', color);

				$scope.$watch('Account.currentPlan', function() {
					var dateStart = new Date($scope.Account.currentPlan.dateStart).getTime();
					var dateEnd = new Date($scope.Account.currentPlan.dateEnd).getTime();
					total = dateEnd - dateStart;
					remaining = dateEnd - new Date().getTime();
					percent = Math.round(remaining)*100 / Math.round(total);

					var date = new Date(remaining);
					$local.value = '';
					if(date.getDate() - 1)
						$local.value += (date.getDate() - 1) + 'D - ';
					$local.value += new Date(remaining).getHours() + 'h'

					$node.find('.progress-bar-value').css({
						'width': percent+'%',
						'background-color': barColor
					});
				})

				$scope.toString = function() {
					return '_loadingBar';
				}
			}
		};
	}]);