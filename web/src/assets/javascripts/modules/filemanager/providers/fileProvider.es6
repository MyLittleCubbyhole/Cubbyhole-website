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

			/**
			 * OVERRIDEN
			 */
			File.prototype.download = function(dumpOnly, withoutToken) {
				var url = apiUrl + 'download/' + this.ownerId + this.getFullPath();

				if(!withoutToken)
					url = AuthenticationFactory.request({ url: url }).url;

				if(!dumpOnly)
					$window.location = url;

				return url;
			};

			/**
			 * OVERRIDEN
			 */
			File.prototype.remove = function() {
				this.node.remove();
			}

			/**
			 * OVERRIDEN
			 */
			File.prototype.getPath = function() {
				return this.path;
			}

			/**
			 * OVERRIDEN
			 */
			File.prototype.getFullPath = function() {
				return this.path + this.name;
			}

			File.prototype.toString = function() {
				return 'File';
			};

			return File
		}]
	})