angular.module('FileManager').
	directive('buttonUploader', ['WebsocketFactory', 'UserFactory', 'UploaderFactory', function(WebsocketFactory, UserFactory, UploaderFactory) {
		return {
			scope: true,
			controller: function($scope) {
				var $local = $scope._buttonUploader = {}
				,	self = this;

				self.file;
				self.path;
				self.fileReader = new FileReader();

				$local.selectFile = function() {
					self.$template.click();
				}

				$scope.toString = function() {
					return '_buttonUploader';
				}
			},
			require: 'buttonUploader',
			restrict: 'A',
			link: function($scope, $node, attributes, self) {
				var $local = $scope._buttonUploader
				,	socket = WebsocketFactory();

				self.$template = $node.parent().find('[type=file]');

				self.$template[0].addEventListener('change', function(event){
					self.id = (Math.random() + '').replace('0.', '');
					self.path = $scope.FileManager.currentPath;
					self.file = event.target.files[0];

					UploaderFactory($scope, {local: $local, controller: self}).add(self.id, self.file);

					self.fileReader.onload = function(event){

						var data = event.target.result
						socket.emit('upload', { data: data, name: self.file.name });
					}
					console.log(self.path)
					socket.emit('upload_init', { id: self.id, owner: UserFactory($scope).get().ID, name : self.file.name, size : self.file.size, type: self.file.type, path: self.path });
				});
			}
		};
	}]);