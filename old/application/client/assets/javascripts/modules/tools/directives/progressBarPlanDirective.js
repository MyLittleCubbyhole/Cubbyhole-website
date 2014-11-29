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
				,	bgColor = attributes.bgColor || '#919191'
				,	barColor = attributes.bgColor || '#73c820'
				,	color = attributes.color || '#4B4B4B';

				var date = new Date(remaining);
				$local.value = '';
				if(date.getMonth() || date.getYear() - 70)
					$local.value += (date.getMonth() + (date.getYear() - 70) * 12) + 'M - ';
				if(date.getDate() - 1)
					$local.value += (date.getDate() - 1) + 'D - ';
				$local.value += new Date(remaining).getHours() + 'h'

				$node.css('background-color', bgColor);
				$node.find('.value').css('color', color);

				/**
				 * LISTENER - triggered when a plan is loaded
				 */
				$scope.$watch('Account.currentPlan', function() {
					if($scope.Account.currentPlan.id != 1) {
						var dateStart = new Date($scope.Account.currentPlan.dateStart).getTime();
						var dateEnd = new Date($scope.Account.currentPlan.dateEnd).getTime();
						total = dateEnd - dateStart;
						remaining = dateEnd - new Date().getTime();
						percent = Math.round(remaining)*100 / Math.round(total);

						var date = new Date(remaining);
						$local.value = '';
						if(date.getMonth() || date.getYear() - 70)
							$local.value += (date.getMonth() + (date.getYear() - 70) * 12) + 'M - ';
						if(date.getDate() - 1)
							$local.value += (date.getDate() - 1) + 'D - ';
						$local.value += new Date(remaining).getHours() + 'h'

						$node.find('.progress-bar-value').css({
							'width': percent+'%',
							'background-color': barColor
						});
					} else {
						$node.find('.progress-bar-value').css({
							'width': '100%',
							'background-color': barColor
						});
						$local.value = 'unlimited';
					}

				})

				$scope.toString = function() {
					return '_loadingBar';
				}
			}
		};
	}]);