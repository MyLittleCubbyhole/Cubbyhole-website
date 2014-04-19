angular.module('FileManager').
	factory('ItemFactory', ['FileProvider', 'FolderProvider', 'FileExtensionFactory', 'Restangular', 'UserFactory', function(File, Folder, ExtensionFactory, restangular, userFactory){

		var _items = [];

		return function($scope, context) {
			context = context || {};

			if(!$scope)
				throw 'a scope must be defined ';

			var prototype = {}
			,	$node = context.node || {}
			,	$local = context.local || {}
			,	controller = context.controller || {};

			prototype.load = function(path) {

				var browse = restangular.one('browse').one(userFactory.get().id + '/');

				path = path || '';

				if(path.slice(-1) != '/')
					path = path + '/';

				var browsePath = browse.one(path);

				browsePath.getList().then(function(items) {
					$scope.FileManager.currentPath = path;

					_items.splice(0);
					$local.items.splice(0);

					var item = null
					,	options = {};

					for(var i = 0; i<items.length; i++) {

						options = {
							name: items[i].name,
							path: path,
							type: items[i].type
						}

						ExtensionFactory($scope).detection(options);

						options.scope = $scope;

						switch(items[i].type) {
							case 'file':
								item = new File(options);
							break;
							case 'folder':
								item = new Folder(options);
							break;
							default:
								throw 'unknow item type';
							break;
						}

						_items.push(item);

						items[i].path = item.path;
						$local && $local.items.push(items[i]);
					}

				}, function(error) { console.error(error); });
			}

			prototype.get = function(id) {
				return _items[id];
			}

			return prototype;
		};
	}]);