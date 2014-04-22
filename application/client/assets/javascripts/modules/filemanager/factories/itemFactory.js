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
				var browse = restangular.one('browse').one(userFactory($scope).get().ID + '/');

				path = path || '';
				if(path.slice(-1) != '/')
					path = path + '/';

				var browsePath = browse.one(path.substring(1));

				browsePath.getList().then(function(items) {
					console.log('load',path)
					$scope.FileManager.currentPath = path;

					_items.splice(0);
					$local.items.splice(0);

					var options;
					for(var i = 0; i<items.length; i++) {

						options = Object.create({
							name: items[i].name,
							path: items[i].path,
							type: items[i].type,
							ownerId: items[i].ownerId,
							size: items[i].size
						})

						prototype.add(options);
					}

				}, function(error) { console.error(error); });
			}

			prototype.get = function(id) {
				return _items[id];
			}

			prototype.createFolder = function(name) {

				var browse = restangular.one('browse').one(userFactory($scope).get().ID + '/')
				,	path = $local.currentPath != '/' ? $local.currentPath.substring(1) : '';

				browse.post(path, { name: name }).then(function() {
					prototype.load($local.currentPath);
				}, function(error) { console.error(error); });
			}

			prototype.delete = function(path) {

				var browse = restangular.one('browse').one(userFactory($scope).get().ID + '/');

				browse.one(path).remove().then(function() {
					prototype.load($local.currentPath);
				}, function(error) { console.error(error); });
			}

			prototype.add = function(options) {
				var item;
				ExtensionFactory($scope).detection(options);

				options.scope = $scope;

				switch(options.type) {
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

				// options.path = item.path;
				$local && $local.items.push(options);
			}

			return prototype;
		};
	}]);