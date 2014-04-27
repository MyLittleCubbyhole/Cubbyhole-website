angular.module('FileManager').
	directive('fileUploader', ['WebsocketFactory', 'UserFactory', 'ItemFactory', 'UploaderFactory', function(WebsocketFactory, UserFactory, ItemFactory, UploaderFactory){
		return {
			scope: true,
			require: 'fileUploader',
			restrict: 'A',
			controller: function($scope) {
				var $local = $scope._fileUploader = {}
				,	self = this;

				$local.progress = '';

				self.fileReaders = {};
				self.files = {};
				self.path;

				self.noop = function(event) {
					event.preventDefault();
					event.stopPropagation();
				}

				$scope.toString = function() {
					return '_fileUploader';
				}
			},
			link: function($scope, $node, attributes, self) {
				var $local = $scope._fileUploader
				,	socket = WebsocketFactory();

				$node.on('dragenter', self.noop);
				$node.on('dragleave', self.noop);
				$node.on('dragover', self.noop);

				$node.on('dragstart', function(event) {
					event.originalEvent.dataTransfer.setData('itemToMove', $scope._item.item.path + $scope._item.item.name);
					event.originalEvent.dataTransfer.setData('itemIdToMove', $scope._item.item._id);
				});

				$node.on('drop', function(event){

					self.path = $scope._item.item.getFullPath() || '/';

					event.originalEvent.preventDefault();

					var pathTargetMove = self.path
					,	pathToMove = event.originalEvent.dataTransfer.getData('itemToMove').substring(1)
					,	pathsToMove = pathToMove.split('/')
					,	path = '';

					for(var i = 0; i < pathsToMove.length; i++)
						path += pathsToMove[i] + '/';

					if(path.slice(0, 1) != '/')
						path = '/' + path;

					if(pathTargetMove && pathToMove && pathTargetMove != path && self.path.slice(-1) == '/') {
						ItemFactory($scope, {local: $scope.FileManager}).move(pathToMove, pathTargetMove, event.originalEvent.dataTransfer.getData('itemIdToMove'));
					}

					if(event.originalEvent.dataTransfer.files.length <= 0)
						return true;

					for(var i = 0; i<event.originalEvent.dataTransfer.files.length; i++) {
						var file = event.originalEvent.dataTransfer.files[i]
						init(file);
					}

				});

				function init(file) {
					var id = Math.random().toString().replace('0.', '');

					self.fileReaders[id] = new FileReader();
					self.files[id] = file;

					var newItem = self.path == $scope.FileManager.currentPath ? ItemFactory($scope, {local: $scope.FileManager}).add({
						name: self.files[id].name,
						owner: UserFactory($scope).get().username,
						ownerId: UserFactory($scope).get().id,
						size : 0,
						type: 'file',
						path: self.path,
						lastUpdate: new Date()
					}, function() { $scope.$apply(); }) : $scope._item.item;

					UploaderFactory($scope, {local: $local, controller: self, entity: newItem}).add(id, self.files[id]);

					self.fileReaders[id].onload = function(event){
						var data = event.target.result
						socket.emit('upload', { data: data, name: self.files[id].name });

					}

					socket.emit('upload_init', {
						id: id,
						owner: UserFactory($scope).get().id,
						name : self.files[id].name,
						size : self.files[id].size,
						type: self.files[id].type,
						path: self.path
					});
				}
			}
		};
	}]);