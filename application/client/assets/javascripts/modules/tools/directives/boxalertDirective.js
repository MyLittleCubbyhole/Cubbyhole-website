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
			controller: function($scope) {
				var $local = $scope._boxalert = {}
				,	self = this;
				$local.alerts = {};

				$local.close = function(index) {
					if(!$local.alerts[index])
						return false;

					$timeout.cancel($local.alerts[index].promise);
					delete $local.alerts[index];
				}

				$scope.toString = function() {
					return '_boxalert';
				}
			},
			link: function($scope, $node, attributes) {
				if(!attributes.boxalert)
					throw 'a model must be defined';

				var $local = $scope._boxalert
				,	i = 0
				,	timer = attributes.boxtimer || 3000;


				$parse(attributes.boxalert).assign($scope, function(alert) {
					var index = ++i;
					
					alert = _.extend(alert, { promise: null, index: index });

					$local.alerts[index] = alert;

					// $scope.$apply();
					pop(index);
				})

				function pop(index) {
					$local.alerts[index].promise = $timeout(function() { delete $local.alerts[index]; }, timer);
				}

			}
		};
	}]);