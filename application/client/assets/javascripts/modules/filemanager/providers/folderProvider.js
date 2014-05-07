angular.module('FileManager').
	provider('FolderProvider', function(){

		var _default = {
			name: 'unknow',
			path: '/',
			icon: '',
			category: '',
			scope: null,
			node: null,
			unselectable: false
		};

		this.$get = ['ClassService', 'ItemProvider', '$window', 'apiUrl', 'UserFactory', function(Class, Item, $window, apiUrl, userFactory) {

			var Folder = function(options) {
				var params = {};
				_.extend(params, _default, options);
				Item.call(this, params);

				this.unselectable = params.unselectable || false;
			};

			Class.extend(Item, Folder);

			Folder.prototype.init = function() {};
			Folder.prototype.download = function(dumpOnly) {
				var url = apiUrl + 'download/' + this.ownerId + this.getFullPath();
				url = AuthenticationFactory.request({ url: url }).url;

				if(!dumpOnly)
					$window.location = url;

				return url;
			};

			Folder.prototype.getPath = function() {
				var path = this.path;
				if(this._id == '. .') {
					var paths = path.split('/');
					path = '';
					for(var i = 0; i < paths.length - 2; i++)
						path += paths[i] + '/';
				}
				else if(this._id != '.') {
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