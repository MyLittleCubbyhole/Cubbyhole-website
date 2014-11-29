angular.module('Tools').
	service('ClassService', function(){
		/**
		 * Prototypal inheritence
		 * @param  {Object} parent 
		 * @param  {Object} child  
		 */
		this.extend = 	function(parent, child){
			child.prototype = new parent();
			child.constructor = child;
		}
	});