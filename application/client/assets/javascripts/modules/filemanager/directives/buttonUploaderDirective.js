angular.module('FileManager').
	directive('buttonUploader', ['WebsocketFactory', 'UserFactory', 'UploaderFactory', function(WebsocketFactory, UserFactory, UploaderFactory) {
		return {
			scope: true,
			controller: function($scope) {
				var $local = $scope._buttonUploader = {}
				,	self = this;

				self.path;
				self.fileReaders = {};
				self.files = {};

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
					var id = (Math.random() + '').replace('0.', '');
					self.path = $scope.FileManager.currentPath;
					self.files[id] = event.target.files[0];
					self.fileReaders[id] = new FileReader();

					UploaderFactory($scope, {local: $local, controller: self}).add(id, self.files[id]);

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
				});
			}
		};
	}]);