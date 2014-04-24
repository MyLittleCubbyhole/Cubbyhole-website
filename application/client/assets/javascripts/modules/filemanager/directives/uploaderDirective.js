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

				self.fileReaders = {};
				self.files = {};
				self.path;

				self.noop = function(event) {
					event.preventDefault();
					event.stopPropagation();
				}

				self.dragstart = function(event) {
					event.dataTransfer.fileToMove = "ok";
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
				$node.on('dragstart', self.noop);

				$node.on('drop', function(event){
					event.originalEvent.preventDefault();

					if(event.originalEvent.dataTransfer.files.length <= 0)
						return true;
					
					for(var i = 0; i<event.originalEvent.dataTransfer.files.length; i++) {
						var file = event.originalEvent.dataTransfer.files[i]
						init(file);
					}
					
					// $local.progress = '0%';
					// $scope.$apply();
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