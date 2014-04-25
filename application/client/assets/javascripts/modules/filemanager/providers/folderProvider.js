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

				this.unselectable = options.unselectable || false;
			};

			Class.extend(Item, Folder);

			Folder.prototype.init = function() {};
			Folder.prototype.download = function() {
				var url = apiUrl + 'download/' + userFactory(this.scope).get().id + this.getFullPath();

				$window.location = AuthenticationFactory.request({ url: url }).url;
			};

			Folder.prototype.getPath = function() {
				var path = this.path;
				if(this.name == '. .') {
					var paths = path.split('/');
					path = '';
					for(var i = 0; i < paths.length - 2; i++)
						path += paths[i] + '/';
				}
				else if(this.name != ' . ') {
					path += this.name + '/'
				}
				return path;
			}

			Folder.prototype.getFullPath = function() {
				return this.getPath();
			}

			Folder.prototype.toString = function() {
				return 'Folder';
			}

			return Folder
		}];
	})