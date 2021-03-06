angular.module('Tools').
	directive('boxalert', ['$timeout','$parse', function($timeout, $parse){
		return {
			scope: true,
			require: 'boxalert',
			restrict: 'A',
			template:
				'<article class="alert {{alert.type}}" ng-repeat="alert in _boxalert.alerts">'
			+	    '<h1>{{alert.title}}</h1>'
			+	    '<h5>{{alert.subtitle}}</h5>'
			+	    '<i class="icon-times" ng-click="_boxalert.close(alert.index);"></i>'
			+	'</article>',
			controller: ['$scope', function($scope) {
				var $local = $scope._boxalert = {}
				,	self = this;
				$local.alerts = {};

				/**
				 * close the selected alert
				 * @param  {integer} index index alert
				 */
				$local.close = function(index) {
					if(!$local.alerts[index])
						return false;

					$timeout.cancel($local.alerts[index].promise);
					delete $local.alerts[index];
				};

				$scope.toString = function() {
					return '_boxalert';
				};
			}],
			link: function($scope, $node, attributes) {
				if(!attributes.boxalert)
					throw 'a model must be defined';

				var $local = $scope._boxalert
				,	i = 0
				,	older = 1
				,	length = 0
				,	timer = attributes.boxtimer || 3000;

				/**
				 * add a new alert to the array
				 * @param  {Object} alert Alert
				 */
				$parse(attributes.boxalert).assign($scope, function(alert) {
					var index = ++i;
					length++;


					if(length>3) {
						var nbCondamned = length - 3
						,	k = older;

						while(--nbCondamned>=0) {
							$timeout.cancel($local.alerts[k].promise);
							delete $local.alerts[k];
							k++;
							older = older < k ? k : older;
							length--;
						}

					}

					alert = _.extend(alert, { promise: null, index: index });

					$local.alerts[index] = alert;
					pop(index);
				});

				/**
				 * start the alert deletion
				 * @param  {integer} index alert index
				 */
				function pop(index) {
					$local.alerts[index].promise = $timeout(function() { 
						older = older < index+1 ? index+1 : older;
						delete $local.alerts[index];
						length--;
					}, timer);
				}

			}
		};
	}]);