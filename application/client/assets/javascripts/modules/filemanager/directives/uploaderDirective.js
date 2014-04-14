angular.module('FileManager').
	directive('fileUploader', ['WebsocketFactory', 'UserFactory', function(websocketFactory, UserFactory){
		return {
			scope: true,
			require: 'fileUploader',
			restrict: 'A',
			controller: function($scope) {
				var $local = $scope._fileUploader = {}
				,	self = this;

				$local.progress = '0%';

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
				,	socket = websocketFactory();

				self.path = attributes.filePath || '/';

				$node.on('dragenter', self.noop);
				$node.on('dragleave', self.noop);
				$node.on('dragover', self.noop);

				$node.on('drop', function(event){
					event.originalEvent.preventDefault();
					self.file = event.originalEvent.dataTransfer.files[0];

					self.fileReader.onload = function(event){

						var data = event.target.result
						socket.emit('upload', { data: data, name: self.file.name });
					}

					socket.emit('upload_init', { owner: UserFactory.get().id, name : self.file.name, size : self.file.size, type: self.file.type, path: self.path });
					
					$local.progress = '0%';
					$scope.$apply();
				}); 

				socket.on('upload_next', function(data){
					$local.progress = Math.floor(data['percent']) + '%';
					$scope.$apply();

					var chunk = data['chunk'] * 524288
					,	part = self.file.slice(chunk, chunk + Math.min(524288, (self.file.size - chunk)));

					self.fileReader.readAsBinaryString(part);
				});


				socket.on('upload_done', function(){
					$local.progress = '100%';
					$scope.$apply();
				});
			}
		};
	}]);