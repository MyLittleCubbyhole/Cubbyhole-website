angular.module('FileManager').
	factory('ItemFactory', ['FileProvider', 'FolderProvider', 'FileExtensionFactory', 'Restangular', 'UserFactory', 'AnnyangFormatService', function(File, Folder, ExtensionFactory, restangular, userFactory, AnnyangFormatService){

		var _items = [];

		return function($scope, context) {
			context = context || {};

			if(!$scope)
				throw 'a scope must be defined ';

			var prototype = {}
			,	$node = context.node || {}
			,	$local = context.local || {}
			,	controller = context.controller || {};

			prototype.load = function(item) {
				var ownerId = typeof item == 'object' ? item.ownerId : false
				,	path = typeof item == 'object' ? item.getFullPath() : item ? item : '';
				if(typeof item == 'object' && item._id != '.') {
					if(item._id != '. .')
						$scope.FileManager.pathItems.push({
							name: item.name,
							item: item
						});
					else
						$scope.FileManager.pathItems.pop();
				}

				if(userFactory($scope).get().id) {
					ownerId = ownerId || userFactory($scope).get().id;


					$scope.FileManager.folderOwner = ownerId;

					var browse = restangular.one('browse').one(ownerId + '/');

					path = path || '';
					if(path.slice(-1) != '/')
						path += '/';

					if(path == '/' && (!item || (item._id != '. .' &&  item._id != '.')))
						$scope.FileManager.pathItems.push({
							name: '/',
							item: '/'
						});

					var browsePath = browse.one(path.substring(1));

					browsePath.getList().then(function(items) {
						// $scope.FileManager.currentPath = ownerId != userFactory($scope).get().id ? '/Shared'+path : path;
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
	                			creator: items[i].creator,
								size: items[i].size,
								lastUpdate: items[i].lastUpdate,
								shared: items[i].shared
							});

							prototype.add(options);
						}

					}, function(error) { console.error(error); });
				}
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

			prototype.createFolder = function(item) {

				var browse = restangular.one('browse').one($scope.FileManager.folderOwner + '/')
				,	path = $local.currentPath != '/' ? $local.currentPath.substring(1) : '';

				path = path.indexOf('Shared') != 0 ? path : path.slice(7);

				browse.post(path, { name: item.name }).then(function() {
					item.newItem = false;
					item._id = item.ownerId + '/' + item.path + '/' + item.name;
				}, function(error) { console.error(error); });
			}

			prototype.delete = function(item) {
				var browse = restangular.one('browse').one(item.ownerId.toString());

				browse.one(item.getFullPath()).remove().then(function() {
					prototype.clean(item._id);
				}, function(error) { console.error(error); });
			}

			prototype.move = function(source, target) {

				var move = restangular.one('move').one(target.ownerId.toString());

				move.post(source.getFullPath().substring(1), { path: target.getFullPath() }).then(function() {
					prototype.clean(source._id);
				}, function(error) { console.error(error); });
			}

			prototype.rename = function(fullpath, newName, callback) {

				restangular.one('browse').one(fullpath).customPUT({name: newName}).then(function() {
					//prototype.load($local.currentPath);
				}, function(error) { console.error(error); });
			}

			prototype.checkNameExists = function(name, vocalMode) {
				vocalMode = typeof vocalMode !== 'undefined' && vocalMode === true;
				var exists = false;
				for(var i = 0; i < _items.length; i++) {
					var actualName = _items[i].name;

					if(vocalMode) {
						actualName = AnnyangFormatService.baseFormat(actualName);
						name = AnnyangFormatService.baseFormat(name);
					}

					if(actualName == name) {
						exists = true;
						break;
					}
				}

				return exists;
			}

			prototype.shareFile = function(item, callback) {
				var share = restangular.one('share');

				share.one(item.ownerId + item.getFullPath()).get().then(function(result) {
					if(result && result.token)
						callback.call(this, null, result.token);
					else
						callback.call(this, 'sharing failed');
				}, function(error) {
					callback.call(this, 'sharing failed');
					console.error(error);
				});
			}

			prototype.unshareFile = function(item, callback) {
				var unshare = restangular.one('unshare');

				unshare.one(item.ownerId + item.getFullPath()).get().then(function(result) {
					if(result && result.information)
						callback.call(this, null, result.information);
					else
						callback.call(this, 'unsharing failed');
				}, function(error) {
					callback.call(this, 'unsharing failed');
					console.error(error);
				});
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
				$local && $local.items.push(item);
				callback && callback.call(this);
				return item;
			}

			function addFileNavigation() {
				var index = $scope.FileManager.pathItems.length-1
				,	path;

				path = $scope.FileManager.pathItems[index] && typeof $scope.FileManager.pathItems[index].item != 'string' ?
					$scope.FileManager.pathItems[index].item.getFullPath() :
					$scope.FileManager.pathItems[index].item;
				prototype.add({
					_id: '.',
					name: ' . ',
					path:  path,
					type: 'folder',
					owner: '',
					ownerId: userFactory($scope).get().id,
					size: '',
					unselectable: true
				});

				if($scope.FileManager.currentPath != '/') {
					path = $scope.FileManager.pathItems[index-1] && typeof $scope.FileManager.pathItems[index-1].item != 'string' ?
						$scope.FileManager.pathItems[index-1].item.getFullPath() :
						$scope.FileManager.pathItems[index-1].item;
					prototype.add({
						_id: '. .',
						name: '. .',
						path: path,
						type: 'folder',
						owner: '',
						ownerId: userFactory($scope).get().id,
						size: '',
						unselectable: true
					});
				}
			}

			return prototype;
		};
	}]);