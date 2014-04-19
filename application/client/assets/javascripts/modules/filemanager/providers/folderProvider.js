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

		this.$get = ['ClassService', 'ItemProvider', '$window', 'apiUrl', 'UserFactory', function(Class, Item, $window, apiUrl, userFactory) {

			var Folder = function(options) {

				options.path += options.name + '/';

				options = angular.extend(_default, options);
				Item.call(this, options);
			};

			Class.extend(Item, Folder);

			Folder.prototype.init = function() {};
			Folder.prototype.download = function() {
				$window.location = apiUrl + 'download/' + userFactory.get().id + '/' + this.name + '/';
			};

			return Folder
		}];
	})