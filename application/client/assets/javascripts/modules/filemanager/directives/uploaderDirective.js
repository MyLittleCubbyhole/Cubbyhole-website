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

				self.path = attributes.filePath;

				$node.on('dragenter', self.noop);
				$node.on('dragleave', self.noop);
				$node.on('dragover', self.noop);

				$node.on('dragstart', function(event) {
					$scope.FileManager.draggedItem = null;
					if($scope._item.item._id != '.' && $scope._item.item._id != '. .')
						$scope.FileManager.draggedItem = $scope._item.item;
				});

				$node.on('drop', function(event){

					event.originalEvent.preventDefault();

					var source = $scope.FileManager.draggedItem
					,	target = $scope._item.item;

					if(target
					&& source
					&& target.getFullPath() != source.getFullPath()
					&& target.toString('Folder')
					&& target._id != '.') {
						ItemFactory($scope, {local: $scope.FileManager}).move(source, target);
						if(target._id != '. .')
							target.size += parseInt(source.size, 10);
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
					self.files[id].sizeAdded = 0;

					var newItem = self.path == $scope.FileManager.currentPath ? ItemFactory($scope, {local: $scope.FileManager}).add({
						name: self.files[id].name,
						owner: UserFactory($scope).get().firstname + ' ' + UserFactory($scope).get().lastname,
						ownerId: UserFactory($scope).get().id,
						creator: UserFactory($scope).get().firstname + ' ' + UserFactory($scope).get().lastname,
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
						path: self.path,
						token: UserFactory($scope).get().token
					});
				}
			}
		};
	}]);