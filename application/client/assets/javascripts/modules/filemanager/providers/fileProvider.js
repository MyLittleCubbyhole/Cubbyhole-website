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

		this.$get = ['ClassService', 'ItemProvider', '$window', 'apiUrl', 'UserFactory', 'AuthenticationFactory', function(Class, Item, $window, apiUrl, UserFactory, AuthenticationFactory) {

			var File = function(options) {
				var params = {};
				_.extend(params, _default, options);
				Item.call(this, params);
			};

			Class.extend(Item, File);

			File.prototype.init = function() {};
			File.prototype.download = function() {
				var url = apiUrl + 'download/' + UserFactory(this.scope).get().id + this.getFullPath();

				$window.location = AuthenticationFactory.request({ url: url }).url;
			};

			File.prototype.getPath = function() {
				return this.path;
			}

			File.prototype.getFullPath = function() {
				return this.path + this.name;
			}

			File.prototype.toString = function() {
				return 'File';
			};

			return File
		}]
	})