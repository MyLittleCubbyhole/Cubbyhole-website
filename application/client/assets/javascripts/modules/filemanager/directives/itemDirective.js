angular.module('FileManager').
	directive('item', ['ItemFactory', 'AnnyangFormatService', function(ItemFactory, AnnyangFormatService){
		return {
			scope: true,
			controller: function($scope) {
				var $local = $scope._item = {}
				,	self = this;

				$local.item = {};
				$local.oldName = "";
				$local.selected = false;

				$scope.$on('unselect', function() {
					$local.selected = false;
				})

				$scope.$on('preview_item', function(scope, name, callback) {
					if(name && AnnyangFormatService.removeExtension(AnnyangFormatService.baseFormat($local.item.name)) == AnnyangFormatService.baseFormat(name))
						$local.preview({ctrlKey : true});

					callback && callback.call(this);
				})

				$scope.$on('rename_item', function() {
					$local.rename();
				})

				$scope.$on('download_item', function(scope, name) {
					if(name && AnnyangFormatService.removeExtension(AnnyangFormatService.baseFormat(nameOnly)) == AnnyangFormatService.baseFormat(name))
						$local.download(name);
				})

				$scope.$on('cancel_edit', function() {
					$local.cancelEdit();
				})

				$scope.$on('open_folder', function(scope, name) {
					if(name && AnnyangFormatService.baseFormat($local.item.name) == AnnyangFormatService.baseFormat(name))
						$local.open();
				});

				$scope.$on('open_parent_folder', function() {
					if($local.item._id == '. .')
						$local.open();
				});

				$local.open = function() {
					if($local.item.category != 'folder')
						$local.download()
					else {
						$scope.FileManager.preview(false);
						ItemFactory($scope, {local: $scope.FileManager}).load($local.item);
						// ItemFactory($scope, {local: $scope.FileManager}).load($local.item.getFullPath(), $local.item.ownerId);
					}
				};

				$local.rename = function() {
					if($local.selected) {
						$scope.FileManager.cancelPreview();
						$local.item.editMode = true;
						$local.oldName = $local.item.name;
					}
				};

				$local.cancelEdit = function() {
					$local.item.editMode = false;
					$local.item.name = $local.oldName;

					if($local.item.newItem)
						ItemFactory($scope, {local: $scope.FileManager}).clean(-1);
				};

				$local.validEdit = function(event) {
					var keyCode = event ? event.keyCode : -1;
					if(keyCode == 13 || keyCode == -1) {
						$local.item.editMode = false;
						var newName = $local.item.name;
						$local.item.name = $local.oldName;
						var fullpath = $local.item.ownerId.toString() + $local.item.getFullPath();
						if(newName != '' && newName.indexOf('/') == -1 && newName.indexOf('\\') == -1) {

							if(!ItemFactory($scope, {local: $scope.FileManager}).checkNameExists(newName)) {
								$local.item.name = newName;
								if(!$local.item.newItem)
									ItemFactory($scope, {local: $scope.FileManager}).rename(fullpath, newName);
								else
									ItemFactory($scope, {local: $scope.FileManager}).createFolder($local.item);
							}
							else
								$local.cancelEdit();
						} else
							$local.cancelEdit();
					}
				};

				$local.select = function($event) {
					if($local.item.unselectable === true)
						return true;

					$scope.FileManager.preview(false);

					var witness = $local.selected;
					if(!$event.ctrlKey)
						$scope.$emit('unselect_all');

					$local.selected = !witness;

					if($local.selected)
						$scope.FileManager.selectedItems.push($local.item);
					else
						for(var i = 0; i<$scope.FileManager.selectedItems.length; i++)
							if($scope.FileManager.selectedItems[i].name == $local.item.name) {
								$scope.FileManager.selectedItems.splice(i,1);
								break;
							}
				};

				$local.preview = function($event) {
					$local.select($event);
					if(!$local.item.editMode)
						$scope.FileManager.preview();
				};

				$local.download = function(name) {
					$local.item.download();
				};

				$scope.toString = function() {
					return '_item';
				};
			},
			require: 'item',
			restrict: 'A',
			link: function($scope, $node, attributes, self) {
				var $local = $scope._item;
				self.itemId = attributes.itemId;
				$local.item = ItemFactory($scope).get(attributes.itemId);
				$local.item.node = $node;

			}
		};
	}]);