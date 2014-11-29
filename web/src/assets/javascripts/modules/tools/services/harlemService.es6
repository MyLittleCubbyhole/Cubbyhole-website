angular.module('Tools').
	service('HarlemService', function(){

		var prototype = {}
		,	actions = ['im_drunk','im_baked', '', 'im_trippin','im_blown', 'im_first'];


		prototype.doFirst = function() {
			angular.element('.first-harlem').addClass(actions[5]);
		};

		prototype.doFull = function() {
			var nodes = angular.element('.mw-harlem_shake_me');
			nodes.each(function() {
				angular.element(this).addClass(actions[Math.floor(Math.random()*5)]);
			});
		};
		
		prototype.stop = function() {
			var nodes = angular.element('.mw-harlem_shake_me');
			nodes.each(function() {
				for(var i in actions)
					angular.element(this).removeClass(actions[i]);
			});
		};

		return prototype;
	});