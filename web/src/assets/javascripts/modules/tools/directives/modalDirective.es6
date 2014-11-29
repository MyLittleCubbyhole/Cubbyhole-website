angular.module('Tools').
    directive('modal', [function() {
        return {
            scope: true,
            controller: ['$scope', function($scope) {
                var $local = $scope._modal = {}
                ,   self = this;

                /**
                 * close the current modal
                 */
                $local.close = function() {
                    $scope.Overlay.clickout();
                    if($scope.FileManager) {
                        $scope.FileManager.urlSharing = null;
                        $scope.FileManager.folderSharing = false;
                    }
                    if($scope.Register)
                        $scope.Register.showModal = false;
                };

                $scope.toString = function() {
                    return '_modal';
                };
            }],
            require: 'modal',
            restrict: 'A',
            link: function($scope, $node, attributes, self) {
                var $local = $scope._modal;

                $local.node = $node;
            }
        };
    }]);