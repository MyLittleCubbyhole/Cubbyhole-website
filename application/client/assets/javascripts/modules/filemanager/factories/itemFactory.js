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
				var browse = restangular.one('browse').one(userFactory($scope).get().id + '/');

				path = path || '';
				if(path.slice(-1) != '/')
					path += '/';

				var browsePath = browse.one(path.substring(1));

				browsePath.getList().then(function(items) {
					$scope.FileManager.currentPath = path;

					_items.splice(0);
					$local.items.splice(0);
					_items = [];
					$local.items = [];

					addFileNavigation();

					var options;
					for(var i = 0; i<items.length; i++) {
						options = Object.create({
							_id : items[i]._id,
							name: items[i].name,
							path: items[i].path,
							type: items[i].type,
							ownerId: items[i].ownerId,
                			owner: '',
							size: items[i].size,
							lastUpdate: items[i].lastUpdate
						});

						prototype.add(options);
					}

				}, function(error) { console.error(error); });
			}

			prototype.get = function(id) {
				return _items[id];
			}

			prototype.getAll = function() {
				return _items;
			}

			prototype.clean = function(itemId) {
				for(var i=0; i<_items.length; i++)
					if(_items[i]._id == itemId) {
						_items.splice(i, 1);
						i--;
					}

				prototype.synchronize();
			}

			prototype.createFolder = function(name) {

				var browse = restangular.one('browse').one(userFactory($scope).get().id + '/')
				,	path = $local.currentPath != '/' ? $local.currentPath.substring(1) : '';

				browse.post(path, { name: name }).then(function() {
					//prototype.load($local.currentPath);
				}, function(error) { console.error(error); });
			}

			prototype.delete = function(item) {
				console.log(item);
				var browse = restangular.one('browse').one(userFactory($scope).get().id + '/');

				browse.one(item.getFullPath()).remove().then(function() {
					prototype.clean(item._id);
				}, function(error) { console.error(error); });
			}

			prototype.move = function(pathToMove, pathTargetMove, itemId) {

				var move = restangular.one('move').one(userFactory($scope).get().id + '');

				move.post(pathToMove, { path: pathTargetMove }).then(function() {
					prototype.clean(itemId);
				}, function(error) { console.error(error); });
			}

			prototype.rename = function(path, newName) {

				var browse = restangular.one('browse').one(userFactory($scope).get().id + '/');

				browse.one(path).customPUT({name: newName}).then(function() {
					//prototype.load($local.currentPath);
				}, function(error) { console.error(error); });
			}

			prototype.synchronize = function() {
				$local.items.splice(0);
				$local.items = [];

				for(var i =0; i<_items.length; i++) {
					$local.items.push(_items[i]);
				}
			}

			prototype.add = function(options, callback) {
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
				options.path = item.getPath();
				// options._id = item.getPath();
				// options.fullPath = item.getPath();

				// options.path = item.path;
				$local && $local.items.push(item);
				callback && callback.call(this);
				return item;
			}

			function addFileNavigation() {
				$scope.FileManager.currentPath != '/' && prototype.add({
					_id: '. .',
					name: '. .',
					path: $scope.FileManager.currentPath,
					type: 'folder',
					owner: '',
					ownerId: userFactory($scope).get().id,
					size: '',
					unselectable: true
				});

				prototype.add({
					_id: '.',
					name: ' . ',
					path: $scope.FileManager.currentPath,
					type: 'folder',
					owner: '',
					ownerId: userFactory($scope).get().id,
					size: '',
					unselectable: true
				});
			}

			return prototype;
		};
	}]);