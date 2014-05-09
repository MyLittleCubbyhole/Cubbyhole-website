angular.module('FileManager').
	directive('formPostDownloader', function() {
		return {
			scope: true,
			restrict: 'E',
			controller: ['$scope', 'apiUrl', 'UserFactory', function($scope, apiUrl, UserFactory){
				var $local = $scope._formPostDownloader = {}
				,	iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false
				,	android = navigator.userAgent.toLowerCase().match(/android/g) ? true : false;

				$local.url = apiUrl + 'download/' +UserFactory($scope).get().id+ '/?token=' + UserFactory($scope).get().token;
				$local.target = iOS || android ? '_blank' : 'downloadFrame';

				$scope.$on('start_post_download', function() {
					$local.download();
				})

				$scope.toString = function() {
					return '_formPostDownloader';
				}
			}],
			template:
				'<form target={{_formPostDownloader.target}} action="{{_formPostDownloader.url}}" method="POST" form-post-downloader >'
			+		'<input type="text" name={{index}} value={{item.getFullPath()}} ng-repeat="(index, item) in FileManager.selectedItems">'
			+	'</form>',
			replace: true,
			link: function($scope, $node, attributes) {
				var $local = $scope._formPostDownloader
				,	template = '<iframe name="downloadFrame" id="downloadIFrame" style="display: none;" src="" />';

				$local.download = function() {
					angular.element('#downloadIFrame').remove();
					angular.element('body').append(template);
					$node.submit();
				}
			}
		};
	});