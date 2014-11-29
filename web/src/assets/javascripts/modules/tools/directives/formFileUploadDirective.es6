angular.module('Tools').
	directive('formFileUpload', ['$compile', 'WebsocketFactory', 'UserFactory', 'UploaderFactory', function($compile, WebsocketFactory, UserFactory, UploaderFactory){
		return {
			scope: true,
			controller: ['$scope', function($scope) {
				var $local = $scope._formFileUpload = {}
				,	self = this;

				self.template = '';
				self.$input = null;
				self.$target = null;
				self.fileReaders = {};
				self.files = {};

				/**
				 * read image and add it as a background image
				 * @param  {Object} file File
				 */
				self.readImage = function(file) {
					var fileReaders = new FileReader();
					fileReaders.onload = function(event){
						self.$target.css({ 'background-image':'url('+ event.target.result +')' });
						self.$target.addClass('form-file-preview');
					};
                    fileReaders.readAsDataURL(file);
				};

				/**
				 * update the user photo
				 * @param  {string} photo photo name
				 */
				self.updatePhoto = function(photo) {
					var user = UserFactory($scope).get();
					user.photo = photo;
					UserFactory($scope).set(user);

					var session = false;
					user = localStorage.getItem('user');
					if(!user) {
						user = sessionStorage.getItem('user');
						local = true;
					}

					if(user) {
						user = JSON.parse(user);
						user.photo = photo;
						if(session)
                            sessionStorage.setItem('user', JSON.stringify(user));
                        else
                            localStorage.setItem('user', JSON.stringify(user));
					}

				};

				$scope.toString = function() {
					return '_formFileUpload';
				};
			}],
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

				/**
				 * upload the loaded image
				 * @param  {Object} event Event
				 */
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

							var data = event.target.result;
							socket.emit('upload', { data: data, name: self.files[id].name, id: id });
						};

						socket.emit('upload_init', formFile);
					}
				});
			}
		};
	}]);