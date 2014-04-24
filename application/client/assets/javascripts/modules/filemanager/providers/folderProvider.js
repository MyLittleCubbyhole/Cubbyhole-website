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
				options = _.extend(_default, options);
				Item.call(this, options);
			};

			Class.extend(Item, Folder);

			Folder.prototype.init = function() {};
			Folder.prototype.download = function() {
				var url = apiUrl + 'download/' + userFactory(this.scope).get().id + this.getPath();

				$window.location = AuthenticationFactory.request({ url: url }).url;
			};

			Folder.prototype.getPath = function() {
				return this.path + this.name + '/'
			}

			Folder.prototype.toString = function() {
				return 'Folder';
			}

			return Folder
		}];
	})