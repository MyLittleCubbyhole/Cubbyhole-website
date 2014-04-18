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

		this.$get = ['ClassService', 'ItemProvider', '$window', 'webserviceUrl', 'UserFactory', function(Class, Item, $window, webserviceUrl, userFactory) {

			var Folder = function(options) {

				options.path += options.name + '/';
					
				options = angular.extend(_default, options);
				Item.call(this, options);
			};

			Class.extend(Item, Folder);

			Folder.prototype.init = function() {};
			Folder.prototype.download = function() {
				$window.location = webserviceUrl + 'api/download/' + userFactory.get().id + '/' + this.path + '/';
			};

			return Folder
		}];
	})