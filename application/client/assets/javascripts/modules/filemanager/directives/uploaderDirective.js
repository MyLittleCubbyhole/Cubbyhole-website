angular.module('FileManager').
	directive('fileUploader', ['WebsocketFactory', 'UserFactory', 'ItemFactory', 'UploaderFactory', 'Restangular', function(WebsocketFactory, UserFactory, ItemFactory, UploaderFactory, restangular){
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

				self.path = attributes.filePath || '/';

				$node.on('dragenter', self.noop);
				$node.on('dragleave', self.noop);
				$node.on('dragover', self.noop);

				$node.on('dragstart', function(event) {
					event.originalEvent.dataTransfer.setData('fileToMove', $scope._item.item.path + $scope._item.item.name);
				});

				$node.on('drop', function(event){

					event.originalEvent.preventDefault();

					var pathTargetMove = self.path;
					var pathToMove = event.originalEvent.dataTransfer.getData('fileToMove').substring(1);
					if(pathTargetMove && pathToMove) {
						var move = restangular.one('move').one(UserFactory($scope).get().id + '');
						move.post(pathToMove, { path: pathTargetMove }).then(function() {
							ItemFactory($scope, {local: $scope.FileManager}).load($scope.FileManager.currentPath);
						}, function(error) { console.error(error); });
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

					UploaderFactory($scope, {local: $local, controller: self}).add(id, self.files[id]);

					self.fileReaders[id].onload = function(event){
						console.log(id, self.files[id].name)
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