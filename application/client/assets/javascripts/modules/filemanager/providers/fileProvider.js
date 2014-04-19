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

				options = angular.extend(_default, options);
				Item.call(this, options);
			};

			Class.extend(Item, File);

			File.prototype.init = function() {};
			File.prototype.download = function() {
				var url = apiUrl + 'download/' + UserFactory(this.scope).get().id + this.path + this.name;

				$window.location = AuthenticationFactory.request({ url: url }).url;
			};

			return File
		}]
	})