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

		this.$get = ['ClassService', 'ItemProvider', '$window', 'webserviceUrl', 'UserFactory',  function(Class, Item, $window, webserviceUrl, userFactory) {

			var File = function(options) {
					
				options = angular.extend(_default, options);
				Item.call(this, options);
			};

			Class.extend(Item, File);

			File.prototype.init = function() {};
			File.prototype.download = function() {
				$window.location = webserviceUrl + 'api/download/' + userFactory.get().id + '/' + this.path + this.name;
			};
			
			return File
		}]	
	})