angular.module('FileManager').
	directive('fileUploader', ['WebsocketFactory', 'UserFactory', 'UploaderFactory', function(WebsocketFactory, UserFactory, UploaderFactory){
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

				$node.on('drop', function(event){
					event.originalEvent.preventDefault();

					if(event.originalEvent.dataTransfer.files.length <= 0)
						return true;

					self.file = event.originalEvent.dataTransfer.files[0];

					UploaderFactory($scope, {local: $local, controller: self}).add(self.id, self.file);

					self.fileReader.onload = function(event){

						var data = event.target.result
						socket.emit('upload', { data: data, name: self.file.name });
					}

					socket.emit('upload_init', { id: self.id, owner: UserFactory($scope).get().ID, name : self.file.name, size : self.file.size, type: self.file.type, path: self.path });

					// $local.progress = '0%';
					// $scope.$apply();
				});
			}
		};
	}]);