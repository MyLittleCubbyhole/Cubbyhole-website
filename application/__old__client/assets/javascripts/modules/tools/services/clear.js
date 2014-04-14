angular.module('Tools').
	service('clear', function(){
		this.node = {};
		this.node.attributes = function ($node, attributes, ignore){
			var attrToKill = attributes.$attr ? attributes.$attr : attributes;
			ignore = ignore || [];
			for(var i in attrToKill)
				if(ignore.indexOf(i) == -1)
					$node.removeAttr(attrToKill[i]);
		}
	});