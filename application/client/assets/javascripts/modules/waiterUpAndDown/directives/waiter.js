/**
 * options:
 * 		auto - active le démarage automatique de l'animation
 * 		frame - frame par défaut
 * 		debug - determine si le waiter doit s'afficher directement au lancement de la page
 * 		src - source de l'image - nom.png - doit se trouver dans le dossier image du module
 * 		frames - découpe du sprite
 * 		size - dimensions de la découpe - utilisée comme projection si cette derniere n'est pas définie
 * 		projection - dimensions de la projection
 * 		speed - vitesse d'animation
 * 		square - affichage carré
 * 		hideValue - determine l'affichage ou non de la valeur de progression
 */
angular.module('WaiterUpAndDown').
	directive('waiter', ['Animation', 'clear', '$parse', function(Animation, clear, $parse){
	return {
		scope: {},
		restrict: 'E',
		templateUrl: 'templates/waiter',
		replace: true,
		require: 'waiter',
		controller: function($scope) {
			var self = this;
			var scope = $scope;
			var timer = null;
			self.animation;

			$scope.$on('startTask', function() {
				$scope.active = true;
				self.start();
			})
			$scope.$on('stopTask', function() {
				self.reset();
				$scope.active = false;
			})
			$scope.$on('updateTaskProgress', function(event, value) {
				self.add(value);
			})

			self.setValue = function(value) {
				$scope.value = value;
			}
			self.add = function(value) {
				value = value + $scope.value;
				if(value >= 100)
					self.done();
				else
					self.setValue(value);
			}
			$scope.substract = function(value) {
				value = $scope.value - value;
				value = value <= 0 ? 0 : value;
				self.setValue(value);
			}
			self.start = function() {
				self.setValue(0);
				self.animation.start();
			};
			self.reset = function(callback) {
				self.setValue(0);
				self.animation.stop(callback);
			};
			self.done  = function() {
				self.setValue(100);
				self.animation.stop();
			};

		},
		link: function($scope, $node, attributes, self) {
			$scope.active = false;
			$scope.square = '';
			$scope.value = 0;

			var settings = {
				auto: 	typeof attributes.auto != 'undefined',
				debug: 	typeof attributes.debug != 'undefined',
				frame: attributes.frame ? $parse(attributes.frame)($scope) : 0,
				src: attributes.src ?'/images/modules/waiter/'+attributes.src : '/images/modules/waiter/box_bouncing.png',
				frames: attributes.frames ? $parse(attributes.frames)($scope) : [{x: 0, y: 0},{x: 110, y: 0},{x: 220, y: 0},{x: 330, y: 0},{x: 440, y: 0}],
				size: attributes.size ? $parse(attributes.size)($scope) : {width: 110, height: 110},
				projection:	attributes.projection ? $parse(attributes.projection)($scope) : { width: 0, height: 0 },
				speed:	attributes.speed ? $parse(attributes.speed)($scope) : null,
				square: 	typeof attributes.square != 'undefined' ? 'square' : '',
				hidevalue:	typeof attributes.hidevalue != 'undefined'
			};

			clear.node.attributes($node, attributes, ['waiter']);

			$scope.active = settings.debug;
			$scope.square = settings.square;
			$scope.hideValue = settings.hidevalue;

			$scope.size = {};
			$scope.size.width  = (settings.projection.width  != 0 ? settings.projection.width  : settings.size.width  )+'px';
			$scope.size.height = (settings.projection.height != 0 ? settings.projection.height : settings.size.height )+'px';
			var canvas  = $node.find('canvas')[0];
			var options = {
				context: canvas.getContext('2d'),
				src: settings.src,
				frame: settings.frame,
				speed: settings.speed,
				sprite: { frames: settings.frames, size: settings.size, projection: settings.projection },
				onload: function(ctx) { ctx.draw(); settings.auto && ctx.start(); }
			}

			self.animation = new Animation(options);

		}
	};
}]);