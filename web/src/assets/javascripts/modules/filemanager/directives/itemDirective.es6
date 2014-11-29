angular.module('FileManager').
	directive('item', ['ItemFactory', 'AnnyangFormatService', function(ItemFactory, AnnyangFormatService){
		return {
			scope: true,
			controller: ['$scope', function($scope) {
				var $local = $scope._item = {}
				,	self = this;

				$local.item = {};
				$local.oldName = "";
				$local.selected = false;

				/**
				 * LISTENER - unselect the current item
				 * @param  {Object}   scope    Angular scope
				 * @param  {Function} callback 
				 */
				$scope.$on('unselect', function(scope, callback) {
					$local.selected = false;
					callback && callback.call(this);
				});

				/**
				 * LISTENER - VOCAL - start the preview item 
				 * @param  {Object}   scope    Angular scope
				 * @param  {string}   name     
				 * @param  {Boolean}   like     
				 * @param  {Function} callback 
				 */
				$scope.$on('preview_item', function(scope, name, like, callback) {
					if(name && ((!like && AnnyangFormatService.removeExtension(AnnyangFormatService.baseFormat($local.item.name)) == AnnyangFormatService.baseFormat(name)) || (like && AnnyangFormatService.removeExtension(AnnyangFormatService.baseFormat($local.item.name)).indexOf(AnnyangFormatService.baseFormat(name)) > -1)))
						$local.preview({ctrlKey : false});

					callback && callback.call(this);
				});

				/**
				 * LISTENER - rename the current item
				 */
				$scope.$on('rename_item', function() {
					$local.rename();
				});

				/**
				 * LISTENER - select the current item
				 * @param  {Object}   scope    Angular scope
				 * @param  {Function} callback 
				 */
				$scope.$on('select', function(scope, callback) {
					$local.select({ctrlKey : true});
					callback && callback.call(this);
				});

				/**
				 * LISTENER - VOCAL - select the current item
				 * @param  {Object}   scope    Angular scope
				 * @param  {string}   name     
				 * @param  {Boolean}   like     
				 * @param  {Function} callback 
				 */
				$scope.$on('select_item', function(scope, name, like, callback) {
					if(name && ((!like && AnnyangFormatService.removeExtension(AnnyangFormatService.baseFormat($local.item.name)) == AnnyangFormatService.baseFormat(name)) || (like && AnnyangFormatService.removeExtension(AnnyangFormatService.baseFormat($local.item.name)).indexOf(AnnyangFormatService.baseFormat(name)) > -1)))
						$local.select({ctrlKey : true});

					callback && callback.call(this);
				});

				/**
				 * LISTENER - unselect the current item
				 * @param  {Object}   scope    Angular scope
				 * @param  {string}   name     
				 * @param  {boolean}   like     
				 * @param  {Function} callback 
				 */
				$scope.$on('unselect_item', function(scope, name, like, callback) {
					if(name && $local.selected && ((!like && AnnyangFormatService.removeExtension(AnnyangFormatService.baseFormat($local.item.name)) == AnnyangFormatService.baseFormat(name)) || (like && AnnyangFormatService.removeExtension(AnnyangFormatService.baseFormat($local.item.name)).indexOf(AnnyangFormatService.baseFormat(name)) > -1)))
						$local.select({ctrlKey : true});

					callback && callback.call(this);
				});

				/**
				 * LISTENER - cancel the edit mode
				 */
				$scope.$on('cancel_edit', function() {
					$local.cancelEdit();
				});

				/**
				 * LISTENER - open the selected folder
				 * @param  {Object} scope Angular scope
				 * @param  {string} name  
				 * @param  {boolean} like  
				 */
				$scope.$on('open_folder', function(scope, name, like) {
					if(name && ((!like && AnnyangFormatService.baseFormat($local.item.name) == AnnyangFormatService.baseFormat(name)) || (like && AnnyangFormatService.baseFormat($local.item.name).indexOf(AnnyangFormatService.baseFormat(name)) > -1)))
						$local.open();
				});

				/**
				 * LISTENER - open the selected parent folder
				 * @param  {Object} scope Angular scope
				 * @param  {string} name  
				 * @param  {boolean} like  
				 */
				$scope.$on('open_parent_folder', function() {
					if($local.item._id === '. .')
						$local.open();
				});

				/**
				 * open the current item
				 */
				$local.open = function() {
					if($local.item.category !== 'folder')
						$local.download();
					else {
						$scope.FileManager.preview(false);
						ItemFactory($scope, {local: $scope.FileManager}).load($local.item);
					}
				};

				/**
				 * rename the current item
				 */
				$local.rename = function() {
					if($local.selected) {
						$scope.FileManager.cancelPreview();
						$local.item.editMode = true;
						$local.oldName = $local.item.name;
					}
				};

				/**
				 * cancel the edit mode
				 */
				$local.cancelEdit = function() {
					$local.item.editMode = false;
					$local.item.name = $local.oldName;

					if($local.item.newItem)
						ItemFactory($scope, {local: $scope.FileManager}).clean(-1);
				};

				/**
				 * check the name validity before update or create folder
				 * @param  {Object} event Event
				 */
				$local.validEdit = function(event) {
					var keyCode = event ? event.keyCode : -1;
					if(keyCode === 13 || keyCode === -1) {
						$local.item.editMode = false;
						var newName = $local.item.name;
						$local.item.name = $local.oldName;
						var fullpath = $local.item.ownerId.toString() + $local.item.getFullPath();
						if(newName !== '' && newName.indexOf('/') === -1 && newName.indexOf('\\') === -1) {

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

				/**
				 * select the current event
				 * @param  {Object} $event Angular event
				 */
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
							if($scope.FileManager.selectedItems[i].name === $local.item.name) {
								$scope.FileManager.selectedItems.splice(i,1);
								break;
							}
				};

				/**
				 * start the preview of the current item
				 * @param  {Object} $event Angular event
				 */
				$local.preview = function($event) {
					$local.select($event);
					if(!$local.item.editMode)
						$scope.FileManager.preview();
				};

				/**
				 * download the current item
				 * @param  {string} name 
				 */
				$local.download = function(name) {
					$local.item.download();
				};

				$scope.toString = function() {
					return '_item';
				};
			}],
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