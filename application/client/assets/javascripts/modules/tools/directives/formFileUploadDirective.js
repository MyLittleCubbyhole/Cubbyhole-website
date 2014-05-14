angular.module('Tools').
	directive('formFileUpload', ['$compile', function($compile){
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

				$scope.toString = function() {
					return '_formFileUpload';
				}
			},
			require: 'formFileUpload',
			restrict: 'A', 
			link: function($scope, $node, attributes, self) {
				var $local = $scope._formFileUpload
				,	formFileModel = attributes.formFileModel || ''
				,	$parent = $node.parent();

				self.template = $compile('<input type="file" name="form-file-upload" ng-model="'+ formFileModel +'" style="display:none;"/>')($scope);

				self.$input = angular.element(self.template).appendTo($parent);
				self.$target = angular.element(attributes.formFileUpload);

				$node.bind('click', function() {
					self.$input.click();
				});

				self.$input.bind('change', function(event) {
					self.$target && self.readImage(event.target.files[0]);
				});
			}
		};
	}]);