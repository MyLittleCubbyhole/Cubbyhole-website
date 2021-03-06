angular.module('FileManager').
	factory('ItemFactory', ['FileProvider', 'FolderProvider', 'FileExtensionFactory', 'Restangular', 'UserFactory', 'AnnyangFormatService', function(File, Folder, ExtensionFactory, restangular, UserFactory, AnnyangFormatService){

		var _items = [];

		return function($scope, context) {
			context = context || {};

			if(!$scope)
				throw 'a scope must be defined ';

			var prototype = {}
			,	$node = context.node || {}
			,	$local = context.local || {}
			,	controller = context.controller || {};

			/**
			 * load data item
			 * @param  {Object} item Item
			 */
			prototype.load = function(item) {

				var ownerId = item && typeof item == 'object' ? item.ownerId : false
				,	path = item && typeof item == 'object' ? item.getFullPath() : item ? item : '';
				if(item && typeof item == 'object' && item._id !== '.') {
					if(item._id !== '. .')
						$scope.FileManager.pathItems.push({
							name: item.name,
							item: item
						});
					else
						$scope.FileManager.pathItems.pop();
				}

				if(UserFactory($scope).get().id) {
					ownerId = ownerId || UserFactory($scope).get().id;


					$scope.FileManager.folderOwner = ownerId;

					var browse = restangular.one('browse').one(ownerId + '/');

					path = path || '';
					if(path.slice(-1) !== '/')
						path += '/';

					if(path === '/' && (!item || (item._id !== '. .' &&  item._id !== '.')))
						$scope.FileManager.pathItems = new Array({
							name: 'Files',
							item: '/'
						});

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
							options = {
								_id : items[i]._id,
								name: items[i].name,
								path: items[i].path,
								type: items[i].type,
								ownerId: items[i].ownerId,
								creatorId: items[i].creatorId || items[i].ownerId,
	                			creator: items[i].creator,
								size: items[i]._id.substring(1) === '/Shared'? '' : items[i].size,
								lastUpdate: items[i].lastUpdate,
								lastUpdateName: items[i].lastUpdateName,
								shared: items[i].shared,
								downloads: items[i].downloads
							};

							if(options._id.substring(1) === '/Shared') {
								options.unselectable = true;
								options.special = true;
							}

							prototype.add(options);
						}

					}, function(error) { console.error(error); });
				}
			};

			/**
			 * get the id by its id
			 * @param  {integer} id 
			 */
			prototype.get = function(id) {
				return _items[id];
			};

			/**
			 * get all loaded items
			 */
			prototype.getAll = function() {
				return _items;
			};

			/**
			 * delete an item and re synchronize
			 * @param  {integer}   itemId   
			 * @param  {Function} callback 
			 */
			prototype.clean = function(itemId, callback) {
				for(var i=0; i<_items.length; i++)
					if(_items[i]._id == itemId) {
						_items.splice(i, 1);
						i--;
					}

				prototype.synchronize();
			};

			/**
			 * create a new folder in database
			 * @param  {Object} item folder informations
			 */
			prototype.createFolder = function(item) {

				var browse = restangular.one('browse').one($scope.FileManager.folderOwner + '/')
				,	path = $local.currentPath !== '/' ? $local.currentPath.substring(1) : '';

				path = path.indexOf('Shared') !== 0 ? path : path.slice(7);

				browse.post(path, { name: item.name }).then(function(data) {
					item.newItem = false;
					item._id = item.ownerId + item.path + item.name;

					if(!!data.information && data.information.indexOf('error') > -1) {
						prototype.clean(item._id);
					  	$local.addError('Folder not created', data.information);
					}
				}, function(error) {
					prototype.clean(item._id);
					console.error(error);
				});
			};

			/**
			 * delete the selected item
			 * @param  {Object} item Item
			 */
			prototype.delete = function(item) {
				var browse = restangular.one('browse').one(item.ownerId.toString()+item.getFullPath()).remove().then(function(data) {
					if(!!data.information && data.information.indexOf('error') > -1)
            			$local.addError('Item not deleted', data.information);
            		else
						prototype.clean(item._id);

				}, function(error) {

					console.error(error);
				});
			};

			/**
			 * copy & paste the selected item
			 * @param  {Object} source 
			 * @param  {Object} target 
			 */
			prototype.copy = function(source, target) {

				var copy = restangular.one('copy').one(source.ownerId.toString());

				copy.post(source.getFullPath().substring(1), { path: target.ownerId + target.path }).then(function(data) {
					if(data.information && data.information.indexOf('error') === -1) {
						var witness = false;
						for(var i=0; i<_items.length; i++)
							if(_items[i]._id === data.params.fullPath) {
								witness = true;
								break;
							}

						if(!witness) {
							options = {
								_id : data.params.fullPath,
								name: data.params.newName,
								path: target.path,
								type: target.options.type,
								ownerId: data.params.creatorId,
								creator: data.params.creator,
								size: target.options.size,
								lastUpdate: new Date(),
								lastUpdateName: data.params.creator,
								shared: false,
								downloads: 0
							};
							prototype.add(options);
						}
            			//$local.addInfo(target.options.type[0].toUpperCase() + target.options.type.slice(1) + ' pasted', 'The ' + target.options.type + ' ' + data.params.newName + ' has been pasted');
					} else
						$local.addError(target.options.type[0].toUpperCase() + target.options.type.slice(1) + ' not copied', data.information);

				}, function(error) { console.error(error); });
			};

			/**
			 * move an item into the selected target
			 * @param  {Object} source 
			 * @param  {Object} target 
			 */
			prototype.move = function(source, target) {

				var move = restangular.one('move').one(target.ownerId.toString());

				move.post(source.getFullPath().substring(1), { path: target.ownerId + target.getFullPath() }).then(function(data) {
					if(!data.information || data.information.indexOf('error') > -1)
						$local.addError('Item not moved', data.information);
					else
						prototype.clean(source._id);
				}, function(error) { console.error(error); });
			};

			/**
			 * rename an item
			 * @param  {string}   fullpath 
			 * @param  {string}   newName  
			 * @param  {Function} callback 
			 */
			prototype.rename = function(fullpath, newName, callback) {
				restangular.one('browse').one(fullpath).customPUT({name: newName}).then(function(data) {
					if(!data.information || data.information.indexOf('error') > -1)
						$local.addError('Item not renamed', data.information);
				}, function(error) { console.error(error); });
			};

			/**
			 * check if a name already exist
			 * @param  {string} name      
			 * @param  {boolean} vocalMode 
			 */
			prototype.checkNameExists = function(name, vocalMode) {
				vocalMode = typeof vocalMode !== 'undefined' && vocalMode === true;
				var exists = false;
				for(var i = 0; i < _items.length; i++) {
					var actualName = _items[i].name;

					if(vocalMode) {
						actualName = AnnyangFormatService.baseFormat(actualName);
						name = AnnyangFormatService.baseFormat(name);
					}

					if(actualName === name) {
						exists = true;
						break;
					}
				}

				return exists;
			};

			/**
			 * share publicly an item
			 * @param  {Object}   item     
			 * @param  {Function} callback 
			 */
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
			};

			/**
			 * unshare an item
			 * @param  {Object}   item     
			 * @param  {Function} callback 
			 */
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
			};

			/**
			 * synchronize the filemanager items array and the local item
			 */
			prototype.synchronize = function() {
				$local.items.splice(0);
				$local.items = [];

				for(var i =0; i<_items.length; i++) {
					$local.items.push(_items[i]);
				}
			};

			/**
			 * add a new item to the items array
			 * @param {Object}   options  
			 * @param {Function} callback 
			 */
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
			};

			/**
			 * remove all items to delete
			 */
			prototype.cleanToDelete = function() {
				for(var i = _items.length -1; i>= 0; i--) {
					if(_items[i].todelete) {
						_items.splice(i, 1);
						$local && $local.items && $local.items.splice(i, 1);
					}
				}
			};

			/**
			 * add . and .. files
			 */
			function addFileNavigation() {
				var index = $scope.FileManager.pathItems.length-1
				,	path
				,	ownerId = $scope.FileManager.folderOwner;

				path = $scope.FileManager.pathItems[index] && typeof $scope.FileManager.pathItems[index].item != 'string' ?
					$scope.FileManager.pathItems[index].item.getFullPath() :
					$scope.FileManager.pathItems[index].item;
				prototype.add({
					_id: '.',
					name: ' . ',
					path:  path,
					type: 'folder',
					owner: '',
					ownerId: ownerId,
					size: '',
					unselectable: true,
					special: true
				});
				if($scope.FileManager.currentPath !== '/' /*&& $scope.FileManager.currentPath != '/Shared/'*/) {
					path = $scope.FileManager.pathItems[index-1] && typeof $scope.FileManager.pathItems[index-1].item != 'string' ?
						$scope.FileManager.pathItems[index-1].item.getFullPath() :
						$scope.FileManager.pathItems[index-1].item;

					//if(path != '/Shared/')
						prototype.add({
							_id: '. .',
							name: '. .',
							path: path,
							type: 'folder',
							owner: '',
							ownerId: path === '/Shared/' ? UserFactory($scope).get().id : ownerId,
							size: '',
							unselectable: true,
							special: true
						});
				}
			}

			return prototype;
		};
	}]);