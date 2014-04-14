angular.module('FileManager').
	provider('FileProvider', function(){
		
		var _default = {
			name: 'unknow',
			path: '/',
			icon: '',
			category: '',
			scope: null,
			node: null
		};

		this.$get = ['ClassService', 'ItemProvider', function(Class, Item) {

			var File = function(options) {
					
				options = angular.extend(_default, options);
				Item.call(this, options);
			};

			Class.extend(Item, File);

			File.prototype.init = function() {};
			
			return File
		}]	
	})