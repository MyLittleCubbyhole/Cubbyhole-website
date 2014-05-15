angular.module('Tools').
	directive('formFileUpload', ['$compile', 'WebsocketFactory', 'UserFactory', 'UploaderFactory', function($compile, WebsocketFactory, UserFactory, UploaderFactory){
		return {
			scope: true,
			controller: function($scope) {
				var $local = $scope._formFileUpload = {}
				,	self = this;

				self.template = '';
				self.$input = null;
				self.$target = null;
				self.fileReaders = {};
				self.files = {};
				self.path;

				self.readImage = function(file) {
					var fileReaders = new FileReader();
					fileReaders.onload = function(event){
						self.$target.css({ "background-image":"url("+ event.target.result +")" });
						self.$target.addClass('form-file-preview');
					}
                    fileReaders.readAsDataURL(file);
				}

				self.upload = function() {}

				$scope.toString = function() {
					return '_formFileUpload';
				}
			},
			require: 'formFileUpload',
			restrict: 'A',
			link: function($scope, $node, attributes, self) {
				var $local = $scope._formFileUpload
				,	formFileModel = attributes.formFileModel || ''
				, 	formFileName = attributes.formFileName || ''
				,	$parent = $node.parent()
				,	socket = WebsocketFactory();

				self.template = $compile('<input type="file" name="'+(formFileName ? formFileName : 'form-file-upload')+'" ng-model="'+ formFileModel +'" style="display:none;"/>')($scope);

				self.$input = angular.element(self.template).appendTo($parent);
				self.$target = angular.element(attributes.formFileUpload);

				$node.bind('click', function() {
					self.$input.click();
				});

				self.$input.bind('change', function(event) {
					self.$target && self.readImage(event.target.files[0]);

					if(typeof attributes.formFileActiveUpload !== 'undefined') {

						var id = (Math.random() + '').replace('0.', '');
						self.files[id] = event.target.files[0];
						self.files[id].sizeAdded = 0;
						self.fileReaders[id] = new FileReader();

						var formFile = {
							id: id,
							name: self.files[id].name,
							size: self.files[id].size,
							type: self.files[id].type,
							token: UserFactory($scope).get().token,
							uploadPhoto: true
						};

						UploaderFactory($scope, {local: $local, controller: self, entity: formFile}).add(id, self.files[id]);

						self.fileReaders[id].onload = function(event){

							var data = event.target.result
							socket.emit('upload', { data: data, name: self.files[id].name, id: id });
						}

						socket.emit('upload_init', formFile);
					}
				});
			}
		};
	}]);