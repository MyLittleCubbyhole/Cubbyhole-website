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

				self.file;
				self.path;
				self.fileReader = new FileReader();

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

				self.id = attributes.fileId || (Math.random() + '').replace('0.', '');
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

					self.file = event.originalEvent.dataTransfer.files[0];

					UploaderFactory($scope, {local: $local, controller: self}).add(self.id, self.file);

					self.fileReader.onload = function(event){

						var data = event.target.result
						socket.emit('upload', { data: data, name: self.file.name });
					}

					socket.emit('upload_init', { id: self.id, owner: UserFactory($scope).get().id, name : self.file.name, size : self.file.size, type: self.file.type, path: self.path });

					// $local.progress = '0%';
					// $scope.$apply();
				});
			}
		};
	}]);