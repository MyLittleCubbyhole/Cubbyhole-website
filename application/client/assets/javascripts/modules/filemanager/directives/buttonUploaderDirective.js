angular.module('FileManager').
	directive('buttonUploader', ['WebsocketFactory', 'UserFactory', 'UploaderFactory', 'ItemFactory', function(WebsocketFactory, UserFactory, UploaderFactory, ItemFactory) {
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
					self.files[id].sizeAdded = 0;
					self.fileReaders[id] = new FileReader();

					if(self.path.substring(1) == '/Shared')
						return true;
					var newItem = ItemFactory($scope, {local: $scope.FileManager}).add({
						name: self.files[id].name,
						owner: UserFactory($scope).get().firstname + ' ' + UserFactory($scope).get().lastname,
						ownerId: $scope.FileManager.folderOwner,
						creator: UserFactory($scope).get().firstname + ' ' + UserFactory($scope).get().lastname,
						size : 0,
                		creatorId: UserFactory($scope).get().id,
						type: 'file',
						path: self.path,
						lastUpdate: new Date(),
						unselectable: true,
						todelete: false,
						inupload: true
					}, function() { $scope.$apply(); })

					ItemFactory($scope, {local: $scope.FileManager}).cleanToDelete();

					UploaderFactory($scope, {local: $local, controller: self, entity: newItem}).add(id, self.files[id]);

					self.fileReaders[id].onload = function(event){

						var data = event.target.result
						socket.emit('upload', { data: data, name: self.files[id].name, id: id });
					}

					socket.emit('upload_init', {
						id: id,
						owner: $scope.FileManager.folderOwner,
						name: self.files[id].name,
						size: self.files[id].size,
						type: self.files[id].type,
						path: self.path,
						token: UserFactory($scope).get().token
					});
				});
			}
		};
	}]);