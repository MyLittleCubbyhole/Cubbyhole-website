angular.module('FileManager').
	provider('FolderProvider', function(){
		
		var _default = {
			name: 'unknow',
			path: '/',
			icon: '',
			category: '',
			scope: null,
			node: null
		};

		this.$get = ['ClassService', 'ItemProvider', function(Class, Item) {

			var Folder = function(options) {
					
				options = angular.extend(_default, options);
				Item.call(this, options);
			};

			Class.extend(Item, Folder);

			Folder.prototype.init = function() {};

			return Folder
		}];
	})